"use client";

// Swiss Blue content studio (admin panel) shell: load/save, sidebar, topbar, layout.
import { useEffect, useMemo, useState } from "react";
import type { AdminSection, JsonObject, JsonValue, Language, StatusTone } from "./admin/types";
import { adminSections, languages, NON_HIDEABLE_SECTIONS, sectionCopy } from "./admin/sections";
import { getAtPath, reorderAtPath, sectionMeta, setAtPath, statusLabel } from "./admin/content-path";
import { FieldEditor } from "./admin/field-editors";
import { hasAuthority } from "@/lib/authorities";

export default function SecretPanel({
  language: initialLanguage = "en",
  perms = [],
}: {
  language?: Language;
  perms?: string[];
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [content, setContent] = useState<JsonObject | null>(null);
  const [hiddenSections, setHiddenSections] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("hero");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [statusTone, setStatusTone] = useState<StatusTone>("ready");

  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content);
        setHiddenSections(Array.isArray(data.hiddenSections) ? data.hiddenSections : []);
        setStatus("ready");
        setStatusTone("ready");
      })
      .catch(() => {
        setStatus("loadError");
        setStatusTone("error");
      });
  }, []);

  // Warn before a hard browser navigation / tab close while edits are unsaved.
  useEffect(() => {
    if (statusTone !== "dirty") {
      return;
    }
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [statusTone]);

  const selectedSection = adminSections.find((section) => section.id === selectedId) ?? adminSections[0];
  const selectedSectionCopy = sectionCopy(selectedSection, language);
  const activePath = [language, ...selectedSection.path];
  const sectionValue = content ? getAtPath(content, activePath) : null;
  const selectedHideable = !NON_HIDEABLE_SECTIONS.has(selectedSection.id);
  const selectedHidden = hiddenSections.includes(selectedSection.id);

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return adminSections;
    }

    return adminSections.filter((section) => {
      const copy = sectionCopy(section, language);
      return `${section.group} ${section.label} ${section.description} ${copy.group} ${copy.label} ${copy.description}`
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [language, query]);

  const groupedSections = useMemo(() => {
    return filteredSections.reduce<Record<string, AdminSection[]>>((groups, section) => {
      groups[section.group] = [...(groups[section.group] ?? []), section];
      return groups;
    }, {});
  }, [filteredSections]);

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set([selectedSection.group]));

  function toggleGroup(group: string) {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  }

  function updateValue(path: Array<string | number>, value: JsonValue) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return setAtPath(current, path, value) as JsonObject;
    });
    setStatus("dirty");
    setStatusTone("dirty");
  }

  function reorderValue(path: Array<string | number>, from: number, to: number) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return reorderAtPath(current, path, from, to) as JsonObject;
    });
    setStatus("dirty");
    setStatusTone("dirty");
  }

  function toggleHidden(id: string) {
    if (NON_HIDEABLE_SECTIONS.has(id)) {
      return;
    }
    setHiddenSections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setStatus("dirty");
    setStatusTone("dirty");
  }

  async function save() {
    if (!content || statusTone === "saving") {
      return;
    }

    setStatus("saving");
    setStatusTone("saving");

    try {
      const response = await fetch("/api/site-content", {
        body: JSON.stringify({ content, hiddenSections }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Save failed.");
      }

      setContent(data.content);
      if (Array.isArray(data.hiddenSections)) {
        setHiddenSections(data.hiddenSections);
      }
      setStatus("saved");
      setStatusTone("ready");
    } catch {
      setStatus("saveError");
      setStatusTone("error");
    }
  }

  // Confirm before leaving the panel (in-app links) when there are unsaved edits.
  function confirmLeave() {
    if (statusTone !== "dirty") {
      return true;
    }
    return window.confirm(
      language === "ar"
        ? "لديك تغييرات غير محفوظة. هل تريد المغادرة دون حفظها؟"
        : "You have unsaved changes. Leave this page without saving?",
    );
  }

  // --- Authority-aware navigation (perms come from the signed session) ---
  const canEditThisLanguage = hasAuthority(perms, language === "ar" ? "content.ar" : "content.en");
  const canSeeSubmissions = hasAuthority(perms, "submissions");
  const canManageUsers = hasAuthority(perms, "users");
  const canSwitchPanel = hasAuthority(perms, language === "ar" ? "content.en" : "content.ar");

  return (
    <main className="admin-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">SB</span>
          <div>
            <p>{language === "ar" ? "إدارة سويس بلو" : "Swiss Blue CMS"}</p>
            <h1>{language === "ar" ? "استوديو المحتوى" : "Content Studio"}</h1>
          </div>
        </div>

        <div className="admin-mode-card">
          <span>{language === "ar" ? "لغة المحتوى" : "Content language"}</span>
          {canSwitchPanel ? (
            <div
              className="admin-language"
              role="group"
              aria-label={language === "ar" ? "لغة تحرير المحتوى" : "Content editing language"}
            >
              {(["en", "ar"] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  className={language === code ? "active" : ""}
                  aria-pressed={language === code}
                  onClick={() => setLanguage(code)}
                >
                  {languages[code].label}
                </button>
              ))}
            </div>
          ) : (
            <p>
              {language === "ar"
                ? "صلاحيتك تتيح تعديل النسخة العربية فقط."
                : "Your access allows editing the English website only."}
            </p>
          )}
        </div>

        <label className="admin-search">
          <span>{language === "ar" ? "البحث في الأقسام" : "Search sections"}</span>
          <input
            type="search"
            value={query}
            placeholder={language === "ar" ? "ابحث عن الرئيسية، الفوتر، العروض..." : "Find homepage, footer, offers..."}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <nav className="admin-section-list" aria-label={language === "ar" ? "أقسام لوحة الإدارة" : "CMS sections"}>
          {Object.entries(groupedSections).map(([group, sections]) => {
            const localizedGroup = sectionCopy(sections[0], language).group;
            const isSearching = query.trim().length > 0;
            const isOpen = isSearching || openGroups.has(group);

            return (
              <div className={`admin-nav-group${isOpen ? " is-open" : ""}`} key={group}>
                <button
                  type="button"
                  className="admin-nav-group-toggle"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={isOpen}
                >
                  <span className="admin-nav-group-caret" aria-hidden="true" />
                  <span>{localizedGroup}</span>
                </button>
                {isOpen
                  ? sections.map((section) => {
                      const copy = sectionCopy(section, language);

                      return (
                        <button
                          className={selectedSection.id === section.id ? "active" : ""}
                          key={section.id}
                          type="button"
                          onClick={() => setSelectedId(section.id)}
                        >
                          <span>
                            {copy.label}
                            {hiddenSections.includes(section.id) ? (
                              <span className="admin-hidden-badge">
                                {language === "ar" ? "مخفي" : "Hidden"}
                              </span>
                            ) : null}
                          </span>
                          <small>{copy.description}</small>
                        </button>
                      );
                    })
                  : null}
              </div>
            );
          })}
        </nav>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">
              {selectedSectionCopy.group} / {languages[language].label}
            </p>
            <h2>{selectedSectionCopy.label}</h2>
            <p>{selectedSectionCopy.description}</p>
          </div>

          <div className="admin-actions">
            <span className={`admin-status ${statusTone}`}>{statusLabel(status, language)}</span>
            {selectedHideable ? (
              <button
                type="button"
                className={`admin-hide-toggle${selectedHidden ? " is-hidden" : ""}`}
                onClick={() => toggleHidden(selectedSection.id)}
                aria-pressed={selectedHidden}
              >
                {selectedHidden
                  ? language === "ar"
                    ? "إظهار القسم"
                    : "Show section"
                  : language === "ar"
                    ? "إخفاء القسم"
                    : "Hide section"}
              </button>
            ) : null}
            {canSeeSubmissions ? (
              <a
                className="admin-preview"
                href="/secretpanel/submissions"
                onClick={(event) => {
                  if (!confirmLeave()) event.preventDefault();
                }}
              >
                {language === "ar" ? "الطلبات الواردة" : "Submissions"}
              </a>
            ) : null}
            {canManageUsers ? (
              <a
                className="admin-preview"
                href="/secretpanel/users"
                onClick={(event) => {
                  if (!confirmLeave()) event.preventDefault();
                }}
              >
                {language === "ar" ? "المستخدمون" : "Users"}
              </a>
            ) : null}
            <a className="admin-preview" href={languages[language].previewHref} target="_blank" rel="noreferrer">
              {language === "ar" ? "معاينة الموقع" : "Preview site"}
            </a>
            <button className="admin-save" type="button" onClick={save} disabled={!canEditThisLanguage}>
              {language === "ar" ? "حفظ التغييرات" : "Save changes"}
            </button>
            <button
              type="button"
              className="admin-preview"
              onClick={async () => {
                if (!confirmLeave()) {
                  return;
                }
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/secretpanel/login";
              }}
            >
              {language === "ar" ? "تسجيل الخروج" : "Sign out"}
            </button>
          </div>
        </header>

        <div className="admin-editor-grid">
          <section className="admin-panel admin-content-panel" dir={language === "ar" ? "rtl" : "ltr"}>
            <div className="admin-panel-head">
              <div>
                <p className="admin-kicker">
                  {language === "ar" ? "محتوى عربي" : `${languages[language].short} content`}
                </p>
                <h3>{selectedSectionCopy.label}</h3>
              </div>
              <span>{sectionMeta(sectionValue, language)}</span>
            </div>

            {selectedHidden ? (
              <div className="admin-hidden-note">
                {language === "ar"
                  ? 'هذا القسم مخفي حاليًا من الموقع المباشر. اضغط "إظهار القسم" ثم احفظ لإعادته.'
                  : 'This section is hidden from the live site. Click "Show section", then save, to restore it.'}
              </div>
            ) : null}

            {sectionValue ? (
              <FieldEditor
                name={selectedSection.id}
                value={sectionValue}
                path={activePath}
                language={language}
                onChange={updateValue}
                onReorder={reorderValue}
              />
            ) : (
              <div className="content-card">{language === "ar" ? "جار تحميل المحرر..." : "Loading editor..."}</div>
            )}
          </section>

          <aside className="admin-help">
            <p className="admin-kicker">{language === "ar" ? "دليل التحرير" : "Editing guide"}</p>
            <h3>{language === "ar" ? "طريقة العمل" : "Workflow"}</h3>
            <ul>
              <li>{language === "ar" ? "استخدم اللوحة المناسبة للنسخة التي تريد تعديلها." : "Use the panel that matches the website version you want to edit."}</li>
              <li>{language === "ar" ? "اختر القسم من القائمة الجانبية." : "Choose a section from the sidebar."}</li>
              <li>{language === "ar" ? "استخدم مقبض السحب فقط لتغيير ترتيب البطاقات." : "Use the drag handle only to reorder repeated cards."}</li>
              <li>{language === "ar" ? "احفظ بعد الانتهاء من مجموعة التعديلات." : "Save once you finish a group of edits."}</li>
            </ul>
            <div>
              <strong>{language === "ar" ? "تحديث مباشر" : "Live update"}</strong>
              <p>
                {language === "ar"
                  ? "يتم حفظ المحتوى في نظام الإدارة، وتتحدث الصفحات العامة بدون إعادة نشر."
                  : "Saved content is stored in the CMS backend and public pages refresh without redeploy."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
