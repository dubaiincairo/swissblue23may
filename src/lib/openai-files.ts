const OPENAI_BASE = "https://api.openai.com/v1";

type OpenAIFile = { id?: string; filename?: string };
type VectorStoreFile = { id?: string; status?: string; last_error?: { message?: string } | null };

function headers(json = false) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OpenAI is not configured.");
  return {
    Authorization: `Bearer ${key}`,
    ...(json ? { "Content-Type": "application/json" } : {}),
  };
}

async function openAiFetch(path: string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    return await fetch(`${OPENAI_BASE}${path}`, {
      ...init,
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function uploadKnowledgeFile(file: File) {
  const form = new FormData();
  form.set("purpose", "assistants");
  form.set("file", file);

  const response = await openAiFetch("/files", {
    method: "POST",
    headers: headers(),
    body: form,
  });
  const payload = (await response.json().catch(() => ({}))) as OpenAIFile & { error?: { message?: string } };
  if (!response.ok || !payload.id) {
    throw new Error(payload.error?.message || "OpenAI file upload failed.");
  }
  return payload.id;
}

export async function attachKnowledgeFile(fileId: string) {
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID?.trim();
  if (!vectorStoreId) throw new Error("OpenAI vector store is not configured.");

  const response = await openAiFetch(`/vector_stores/${encodeURIComponent(vectorStoreId)}/files`, {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify({ file_id: fileId }),
  });
  const payload = (await response.json().catch(() => ({}))) as VectorStoreFile & { error?: { message?: string } };
  if (!response.ok || !payload.id) {
    throw new Error(payload.error?.message || "Could not add the file to the knowledge base.");
  }
  return { id: payload.id, status: normalizeStatus(payload.status) };
}

function normalizeStatus(status?: string): "processing" | "completed" | "failed" {
  if (status === "completed") return "completed";
  if (status === "failed" || status === "cancelled") return "failed";
  return "processing";
}

export async function getKnowledgeFileStatus(vectorStoreFileId: string) {
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID?.trim();
  if (!vectorStoreId) return "failed" as const;
  const response = await openAiFetch(
    `/vector_stores/${encodeURIComponent(vectorStoreId)}/files/${encodeURIComponent(vectorStoreFileId)}`,
    { method: "GET", headers: headers() },
  );
  if (!response.ok) return "failed" as const;
  const payload = (await response.json()) as VectorStoreFile;
  return normalizeStatus(payload.status);
}

export async function deleteKnowledgeFile(fileId: string, vectorStoreFileId: string) {
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID?.trim();
  if (vectorStoreId && vectorStoreFileId) {
    await openAiFetch(
      `/vector_stores/${encodeURIComponent(vectorStoreId)}/files/${encodeURIComponent(vectorStoreFileId)}`,
      { method: "DELETE", headers: headers() },
    ).catch(() => null);
  }
  if (fileId) {
    await openAiFetch(`/files/${encodeURIComponent(fileId)}`, {
      method: "DELETE",
      headers: headers(),
    }).catch(() => null);
  }
}
