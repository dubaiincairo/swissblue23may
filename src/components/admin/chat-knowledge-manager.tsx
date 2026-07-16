"use client";

import { Database, FileText, FileUp, Link2, RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatKnowledgeSource } from "@/lib/chat-knowledge";
import type { Language } from "./types";

type KnowledgeResponse = {
  configured: boolean;
  sources: ChatKnowledgeSource[];
  error?: string;
};

export function ChatKnowledgeManager({ language }: { language: Language }) {
  const [sources, setSources] = useState<ChatKnowledgeSource[]>([]);
  const [configured, setConfigured] = useState(true);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState<"load" | "url" | "file" | string | null>("load");
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const ar = language === "ar";

  const refresh = useCallback(async () => {
    setBusy((current) => current ?? "load");
    setMessage("");
    try {
      const response = await fetch("/api/admin/chat-knowledge", { cache: "no-store" });
      const data = (await response.json()) as KnowledgeResponse;
      if (!response.ok) throw new Error(data.error || "Could not load sources.");
      setConfigured(data.configured);
      setSources(data.sources ?? []);
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Could not load sources.");
    } finally {
      setBusy(null);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/chat-knowledge", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as KnowledgeResponse;
        if (!response.ok) throw new Error(data.error || "Could not load sources.");
        return data;
      })
      .then((data) => {
        if (!active) return;
        setConfigured(data.configured);
        setSources(data.sources ?? []);
      })
      .catch((cause: unknown) => {
        if (active) setMessage(cause instanceof Error ? cause.message : "Could not load sources.");
      })
      .finally(() => {
        if (active) setBusy(null);
      });

    return () => {
      active = false;
    };
  }, []);

  async function addUrl() {
    if (!url.trim() || busy) return;
    setBusy("url");
    setMessage("");
    try {
      const response = await fetch("/api/admin/chat-knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = (await response.json()) as { source?: ChatKnowledgeSource; error?: string };
      if (!response.ok || !data.source) throw new Error(data.error || "Could not add the link.");
      setSources((current) => [data.source!, ...current]);
      setUrl("");
      setMessage(ar ? "تمت إضافة الرابط إلى قاعدة المعرفة." : "The link was added to the knowledge base.");
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Could not add the link.");
    } finally {
      setBusy(null);
    }
  }

  async function addFile(file: File) {
    if (busy) return;
    setBusy("file");
    setMessage("");
    const form = new FormData();
    form.set("file", file);
    try {
      const response = await fetch("/api/admin/chat-knowledge", { method: "POST", body: form });
      const data = (await response.json()) as { source?: ChatKnowledgeSource; error?: string };
      if (!response.ok || !data.source) throw new Error(data.error || "Could not upload the PDF.");
      setSources((current) => [data.source!, ...current]);
      setMessage(ar ? "تمت إضافة ملف PDF إلى قاعدة المعرفة." : "The PDF was added to the knowledge base.");
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Could not upload the PDF.");
    } finally {
      setBusy(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function removeSource(source: ChatKnowledgeSource) {
    if (busy) return;
    if (!window.confirm(ar ? `حذف "${source.title}" من قاعدة المعرفة؟` : `Remove "${source.title}" from the knowledge base?`)) return;
    setBusy(source.id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/chat-knowledge?id=${encodeURIComponent(source.id)}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not remove the source.");
      setSources((current) => current.filter((item) => item.id !== source.id));
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Could not remove the source.");
    } finally {
      setBusy(null);
    }
  }

  if (!configured && busy !== "load") {
    return (
      <div className="admin-knowledge-empty" role="status">
        <Database aria-hidden="true" size={26} />
        <strong>{ar ? "قاعدة المعرفة غير مهيأة" : "Knowledge base is not configured"}</strong>
        <p>{ar ? "أضف OPENAI_VECTOR_STORE_ID ومفتاح OpenAI ورمز الكتابة في Sanity إلى بيئة Vercel." : "Add OPENAI_VECTOR_STORE_ID, the OpenAI key, and the Sanity write token to the Vercel environment."}</p>
      </div>
    );
  }

  return (
    <div className="admin-knowledge-manager">
      <div className="admin-knowledge-intro">
        <Database aria-hidden="true" size={22} />
        <div>
          <strong>{ar ? "مصادر معتمدة للمساعد" : "Approved assistant sources"}</strong>
          <p>{ar ? "أضف روابط عامة أو ملفات PDF موثوقة. يبحث المساعد في هذه المصادر قبل صياغة الإجابة." : "Add trusted public links or PDFs. The assistant searches these sources before composing an answer."}</p>
        </div>
      </div>

      <div className="admin-knowledge-add-grid">
        <div className="admin-knowledge-add-panel">
          <label htmlFor="knowledge-url">{ar ? "رابط صفحة أو مستند" : "Page or document link"}</label>
          <div className="admin-knowledge-url-row">
            <input id="knowledge-url" type="url" value={url} placeholder="https://" onChange={(event) => setUrl(event.target.value)} />
            <button type="button" onClick={addUrl} disabled={!url.trim() || Boolean(busy)}>
              <Link2 aria-hidden="true" size={17} />
              {busy === "url" ? (ar ? "جار الإضافة" : "Adding") : ar ? "إضافة الرابط" : "Add link"}
            </button>
          </div>
        </div>
        <div className="admin-knowledge-add-panel">
          <span>{ar ? "ملف PDF" : "PDF document"}</span>
          <input
            ref={fileRef}
            id="knowledge-pdf"
            className="sr-only"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void addFile(file);
            }}
          />
          <button type="button" className="admin-knowledge-file-button" onClick={() => fileRef.current?.click()} disabled={Boolean(busy)}>
            <FileUp aria-hidden="true" size={17} />
            {busy === "file" ? (ar ? "جار الرفع" : "Uploading") : ar ? "رفع ملف PDF" : "Upload PDF"}
          </button>
          <small>{ar ? "الحد الأقصى 12 ميجابايت" : "Maximum 12 MB"}</small>
        </div>
      </div>

      {message ? <p className="admin-knowledge-message" role="status">{message}</p> : null}

      <div className="admin-knowledge-list-head">
        <div>
          <strong>{ar ? "المصادر الحالية" : "Current sources"}</strong>
          <span>{sources.length}</span>
        </div>
        <button type="button" aria-label={ar ? "تحديث حالة المصادر" : "Refresh source status"} title={ar ? "تحديث" : "Refresh"} onClick={() => void refresh()} disabled={Boolean(busy)}>
          <RefreshCw aria-hidden="true" size={17} />
        </button>
      </div>

      {sources.length ? (
        <ul className="admin-knowledge-list">
          {sources.map((source) => (
            <li key={source.id}>
              <span className="admin-knowledge-source-icon" aria-hidden="true">
                {source.kind === "pdf" ? <FileText size={18} /> : <Link2 size={18} />}
              </span>
              <div>
                <strong>{source.title}</strong>
                {source.sourceUrl ? <a href={source.sourceUrl} target="_blank" rel="noreferrer">{source.sourceUrl}</a> : null}
                <small>{new Intl.DateTimeFormat(ar ? "ar-SA" : "en", { dateStyle: "medium" }).format(new Date(source.createdAt))}</small>
              </div>
              <span className={`admin-knowledge-status is-${source.status}`}>
                {source.status === "completed" ? (ar ? "جاهز" : "Ready") : source.status === "failed" ? (ar ? "فشل" : "Failed") : ar ? "جار التجهيز" : "Processing"}
              </span>
              <button type="button" className="admin-knowledge-remove" aria-label={ar ? `حذف ${source.title}` : `Remove ${source.title}`} title={ar ? "حذف" : "Remove"} onClick={() => void removeSource(source)} disabled={Boolean(busy)}>
                <Trash2 aria-hidden="true" size={17} />
              </button>
            </li>
          ))}
        </ul>
      ) : busy === "load" ? (
        <div className="admin-knowledge-empty">{ar ? "جار تحميل المصادر..." : "Loading sources..."}</div>
      ) : (
        <div className="admin-knowledge-empty">{ar ? "لم تتم إضافة مصادر بعد." : "No sources have been added yet."}</div>
      )}
    </div>
  );
}
