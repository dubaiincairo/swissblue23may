"use client";

import type { DragEvent } from "react";
import { useState } from "react";
import { RichEditor } from "@/components/rich-editor";
import { RephraseButton } from "@/components/rephrase-button";
import { StockPhotoPicker } from "@/components/stock-photo-picker";
import { TranslateButton } from "@/components/translate-button";
import { PAGE_KEYS, PAGE_NAMES } from "@/lib/page-seo";
import type { JsonObject, JsonValue, Language } from "./types";
import { labelFor, orderedEntries, shouldShowField } from "./sections";
import { cloneTemplate, isPlainObject, itemTitle } from "./content-path";
import { acceptsVideo, isImageField, isLogoField, isLongField, localizedImageGuidance, removeLogoBackground } from "./image-utils";

export function ImageFieldEditor({
  name,
  value,
  path,
  language,
  onChange,
}: {
  name: string;
  value: string;
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
}) {
  const [uploadStatus, setUploadStatus] = useState("");
  const [pickerSource, setPickerSource] = useState<"unsplash" | "pexels" | null>(null);

  function handleStockSelect(asset: { url: string; width?: number; height?: number }) {
    onChange(path, asset.url);
    if (path.at(-1) === "source") {
      onChange([...path.slice(0, -1), "kind"], "image");
    }
    setUploadStatus(
      asset.width && asset.height
        ? language === "ar"
          ? `تم الاستيراد بحجم ${asset.width} x ${asset.height} بكسل. احفظ التغييرات للنشر.`
          : `Imported ${asset.width} x ${asset.height}px. Save changes to publish.`
        : language === "ar"
          ? "تم الاستيراد. احفظ التغييرات للنشر."
          : "Imported. Save changes to publish.",
    );
    setPickerSource(null);
  }

  async function uploadImage(file: File | undefined) {
    if (!file) {
      return;
    }

    setUploadStatus(isLogoField(name) ? "Removing logo background..." : "Uploading image...");

    try {
      const uploadFile = isLogoField(name) && file.type.startsWith("image/")
        ? await removeLogoBackground(file)
        : file;
      const formData = new FormData();
      formData.append("file", uploadFile);

      setUploadStatus("Uploading image...");
      const response = await fetch("/api/site-content/upload", {
        body: formData,
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed.");
      }

      onChange(path, data.url);
      if (path.at(-1) === "source" && typeof data.type === "string") {
        onChange([...path.slice(0, -1), "kind"], data.type);
      }
      setUploadStatus(
        data.width && data.height
          ? language === "ar"
            ? `تم الرفع بحجم ${data.width} x ${data.height} بكسل${isLogoField(name) ? " مع خلفية شفافة" : ""}. احفظ التغييرات للنشر.`
            : `Uploaded ${data.width} x ${data.height}px${isLogoField(name) ? " with transparent background" : ""}. Save changes to publish.`
          : language === "ar" ? "تم الرفع. احفظ التغييرات للنشر." : "Uploaded. Save changes to publish.",
      );
    } catch (error) {
      setUploadStatus(error instanceof Error ? error.message : "Upload failed. Please try again.");
    }
  }

  return (
    <div className={`admin-field admin-image-field${name === "ogImage" ? " admin-image-field-og" : ""}`}>
      <span>{labelFor(name, language)}</span>
      <div className="admin-image-control">
        <div className="admin-image-preview">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" />
          ) : (
            <span>{language === "ar" ? "لم يتم اختيار ملف" : "No photo selected"}</span>
          )}
        </div>
        <div className="admin-image-tools">
          <p>{localizedImageGuidance(name, path, language)}</p>
          <div className="admin-image-actions">
            <label className="admin-image-source-icon admin-image-source-upload">
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v12" />
                <path d="m7 9 5-5 5 5" />
                <path d="M5 20h14" />
              </svg>
              <span>
                {language === "ar"
                  ? acceptsVideo(name, path) ? "رفع ملف" : "رفع صورة"
                  : acceptsVideo(name, path) ? "Upload media" : "Upload photo"}
              </span>
              <input
                accept={
                  acceptsVideo(name, path)
                    ? "image/avif,image/jpeg,image/png,image/svg+xml,image/webp,video/mp4,video/quicktime,video/webm"
                    : "image/avif,image/jpeg,image/png,image/svg+xml,image/webp"
                }
                type="file"
                onChange={(event) => uploadImage(event.target.files?.[0])}
              />
            </label>
            <button
              type="button"
              className="admin-image-source-icon admin-image-source-unsplash"
              onClick={() => setPickerSource("unsplash")}
              aria-label={language === "ar" ? "ابحث في Unsplash" : "Search Unsplash"}
              title={language === "ar" ? "ابحث في Unsplash" : "Search Unsplash"}
            >
              <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
                <path d="M10 9V0h12v9H10zM22 14h10v18H0V14h10v9h12v-9z" />
              </svg>
              <span>Unsplash</span>
            </button>
            <button
              type="button"
              className="admin-image-source-icon admin-image-source-pexels"
              onClick={() => setPickerSource("pexels")}
              aria-label={language === "ar" ? "ابحث في Pexels" : "Search Pexels"}
              title={language === "ar" ? "ابحث في Pexels" : "Search Pexels"}
            >
              <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
                <path d="M5 0h13a9 9 0 0 1 9 9v3a9 9 0 0 1-9 9h-5v11H5V0zm8 13h5a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4h-5v8z" />
              </svg>
              <span>Pexels</span>
            </button>
          </div>
          {uploadStatus ? <small>{uploadStatus}</small> : null}
        </div>
      </div>
      <input
        type="url"
        value={value}
        placeholder={language === "ar" ? "أو الصق رابط الملف" : "Or paste an image URL"}
        onChange={(event) => onChange(path, event.target.value)}
      />
      {pickerSource ? (
        <StockPhotoPicker
          language={language}
          initialQuery={labelFor(name, "en")}
          initialSource={pickerSource}
          onSelect={handleStockSelect}
          onClose={() => setPickerSource(null)}
        />
      ) : null}
    </div>
  );
}


export function StringFieldEditor({
  name,
  value,
  path,
  language,
  onChange,
  isNumber,
}: {
  name: string;
  value: string;
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  isNumber?: boolean;
}) {
  const isUrl = ["href", "image", "secondaryHref", "source"].includes(name);
  const isOpaque = ["slug", "type", "kind", "mapQuery"].includes(name);

  if (isUrl) {
    return (
      <label className="admin-field">
        <span>{labelFor(name, language)}</span>
        <input
          type="url"
          value={value}
          onChange={(event) => onChange(path, event.target.value)}
        />
      </label>
    );
  }

  if (isNumber) {
    return (
      <label className="admin-field">
        <span>{labelFor(name, language)}</span>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
        />
      </label>
    );
  }

  if (isLongField(name, value)) {
    return (
      <div className="admin-field">
        <span className="admin-field-label-row">
          <span>{labelFor(name, language)}</span>
          {!isOpaque ? (
            <span className="admin-field-actions">
              <RephraseButton value={value} language={language} path={path} isHtml onChange={onChange} />
              <TranslateButton value={value} sourceLanguage={language} path={path} isHtml onChange={onChange} />
            </span>
          ) : null}
        </span>
        <RichEditor
          value={value}
          onChange={(html) => onChange(path, html)}
          dir={language === "ar" ? "rtl" : "ltr"}
          ariaLabel={labelFor(name, language)}
          language={language}
        />
      </div>
    );
  }

  return (
    <div className="admin-field">
      <span className="admin-field-label-row">
        <span>{labelFor(name, language)}</span>
        {!isOpaque ? (
          <span className="admin-field-actions">
            <RephraseButton value={value} language={language} path={path} onChange={onChange} />
            <TranslateButton value={value} sourceLanguage={language} path={path} onChange={onChange} />
          </span>
        ) : null}
      </span>
      <input
        type="text"
        aria-label={labelFor(name, language)}
        value={value}
        onChange={(event) => onChange(path, event.target.value)}
      />
    </div>
  );
}

const FOCUS_OPTIONS: Array<{ value: string; en: string; ar: string }> = [
  { value: "center", en: "Center", ar: "المنتصف" },
  { value: "top", en: "Top", ar: "الأعلى" },
  { value: "bottom", en: "Bottom", ar: "الأسفل" },
  { value: "left", en: "Left", ar: "اليسار" },
  { value: "right", en: "Right", ar: "اليمين" },
  { value: "top left", en: "Top-left", ar: "أعلى اليسار" },
  { value: "top right", en: "Top-right", ar: "أعلى اليمين" },
  { value: "bottom left", en: "Bottom-left", ar: "أسفل اليسار" },
  { value: "bottom right", en: "Bottom-right", ar: "أسفل اليمين" },
];

// Focal point for a banner photo: which part stays in frame when the wide image
// is cropped to a narrow (mobile) container. Stored as a CSS object-position value.
export function FocalFieldEditor({
  name,
  value,
  path,
  language,
  onChange,
}: {
  name: string;
  value: string;
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
}) {
  return (
    <label className="admin-field admin-focal-field">
      <span>{labelFor(name, language)}</span>
      <select
        className="admin-focal-select"
        value={value || "center"}
        onChange={(event) => onChange(path, event.target.value)}
      >
        {FOCUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {language === "ar" ? option.ar : option.en}
          </option>
        ))}
      </select>
      <small>
        {language === "ar"
          ? "الجزء الذي يبقى ظاهرًا عند اقتصاص الصورة في عرض الجوال."
          : "Which part of the photo stays in view when it's cropped on mobile."}
      </small>
    </label>
  );
}

const SEO_PAGE_FIELDS = ["title", "description", "ogImage"] as const;

function humanizePageKey(key: string) {
  return key
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ") || key;
}

function pageRouteForKey(key: string, language: Language) {
  return key === "home" ? `/${language}` : `/${language}/${key}`;
}

function seoFieldValue(page: JsonObject, field: string) {
  const value = page[field];
  return typeof value === "string" ? value : "";
}

function SeoPagesEditor({
  value,
  path,
  level,
  language,
  onChange,
  onReorder,
}: {
  value: JsonObject;
  path: Array<string | number>;
  level: number;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedPageKey, setSelectedPageKey] = useState(PAGE_KEYS[0] ?? "home");
  const allPageKeys = Array.from(new Set([...PAGE_KEYS, ...Object.keys(value)]));
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const pageItems = allPageKeys.map((key) => {
    const names = PAGE_NAMES[key] ?? { en: humanizePageKey(key), ar: humanizePageKey(key) };
    const pageValue = isPlainObject(value[key]) ? value[key] : {};
    const completedFields = SEO_PAGE_FIELDS.filter((field) => seoFieldValue(pageValue, field).trim()).length;
    const route = pageRouteForKey(key, language);
    const label = names[language] || names.en || humanizePageKey(key);
    const alternateLabel = language === "ar" ? names.en : names.ar;

    return {
      key,
      label,
      alternateLabel,
      route,
      completedFields,
      totalFields: SEO_PAGE_FIELDS.length,
    };
  });
  const filteredPageItems = pageItems.filter((page) => {
    if (!normalizedQuery) {
      return true;
    }

    return [page.label, page.alternateLabel, page.key, page.route]
      .filter(Boolean)
      .some((candidate) => candidate.toLocaleLowerCase().includes(normalizedQuery));
  });
  const selectedPageVisible = filteredPageItems.some((page) => page.key === selectedPageKey);
  const activePageKey = selectedPageVisible ? selectedPageKey : filteredPageItems[0]?.key;
  const activePage = pageItems.find((page) => page.key === activePageKey);
  const activeValue =
    activePageKey && isPlainObject(value[activePageKey]) ? value[activePageKey] : {};

  function handleSelectedPageChange(fieldPath: Array<string | number>, nextValue: JsonValue) {
    if (!activePageKey) {
      return;
    }

    const fieldName = fieldPath.at(-1);
    if (typeof fieldName === "string" && !isPlainObject(value[activePageKey])) {
      onChange([...path, activePageKey], {
        title: "",
        description: "",
        ogImage: "",
        [fieldName]: nextValue,
      });
      return;
    }

    onChange(fieldPath, nextValue);
  }

  return (
    <section className="admin-seo-pages" aria-label={language === "ar" ? "تحسين الصفحات" : "Per-page SEO"}>
      <div className="admin-seo-pages-toolbar">
        <label className="admin-seo-search">
          <span>{language === "ar" ? "البحث عن صفحة" : "Find a page"}</span>
          <input
            type="search"
            value={query}
            placeholder={language === "ar" ? "اكتب اسم الصفحة أو الرابط" : "Type a page name or route"}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="admin-seo-result-count" aria-live="polite">
          <strong>{filteredPageItems.length}</strong>
          <span>{language === "ar" ? "صفحة" : filteredPageItems.length === 1 ? "page" : "pages"}</span>
        </div>
      </div>

      <div className="admin-seo-pages-grid">
        <nav className="admin-seo-page-list" aria-label={language === "ar" ? "الصفحات" : "Pages"}>
          {filteredPageItems.length ? (
            filteredPageItems.map((page) => (
              <button
                key={page.key}
                type="button"
                className={page.key === activePageKey ? "admin-seo-page-button is-active" : "admin-seo-page-button"}
                aria-current={page.key === activePageKey ? "page" : undefined}
                onClick={() => setSelectedPageKey(page.key)}
              >
                <span className="admin-seo-page-copy">
                  <strong>{page.label}</strong>
                  <small>{page.route}</small>
                </span>
                <span className="admin-seo-page-progress">
                  {page.completedFields}/{page.totalFields}
                </span>
              </button>
            ))
          ) : (
            <p className="admin-seo-empty">
              {language === "ar" ? "لا توجد صفحة بهذا البحث." : "No pages match this search."}
            </p>
          )}
        </nav>

        <section className="admin-seo-editor">
          {activePage && activePageKey ? (
            <>
              <div className="admin-seo-editor-head">
                <div>
                  <h3>{activePage.label}</h3>
                  <p>{activePage.route}</p>
                </div>
                <span>
                  {language === "ar"
                    ? `${activePage.completedFields} من ${activePage.totalFields} مكتمل`
                    : `${activePage.completedFields} of ${activePage.totalFields} filled`}
                </span>
              </div>
              <div className="admin-seo-field-grid">
                {SEO_PAGE_FIELDS.map((field) => (
                  <FieldEditor
                    key={`${path.join(".")}-${activePageKey}-${field}`}
                    name={field}
                    value={seoFieldValue(activeValue, field)}
                    path={[...path, activePageKey, field]}
                    level={level + 1}
                    language={language}
                    onChange={handleSelectedPageChange}
                    onReorder={onReorder}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="admin-seo-empty">
              {language === "ar" ? "اختر صفحة لتعديل بياناتها." : "Select a page to edit its SEO."}
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

export function FieldEditor({
  name,
  value,
  path,
  level = 0,
  language,
  onChange,
  onReorder,
}: {
  name: string;
  value: JsonValue;
  path: Array<string | number>;
  level?: number;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (typeof value === "string" || typeof value === "number") {
    const stringValue = String(value);

    if (typeof value === "string" && name === "focus") {
      return <FocalFieldEditor name={name} value={value} path={path} language={language} onChange={onChange} />;
    }

    if (typeof value === "string" && isImageField(name, path, value)) {
      return <ImageFieldEditor name={name} value={value} path={path} language={language} onChange={onChange} />;
    }

    return (
      <StringFieldEditor
        name={name}
        value={stringValue}
        path={path}
        language={language}
        onChange={onChange}
        isNumber={typeof value === "number"}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="admin-check">
        <input
          checked={value}
          type="checkbox"
          onChange={(event) => onChange(path, event.target.checked)}
        />
        <span>{labelFor(name, language)}</span>
      </label>
    );
  }

  if (Array.isArray(value)) {
    const primitiveList = value.every((item) => !isPlainObject(item) && !Array.isArray(item));

    function clearDragState() {
      setDragIndex(null);
      setDragOverIndex(null);
    }

    function handleDragStart(event: DragEvent, index: number) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(index));
      setDragIndex(index);
      setDragOverIndex(null);
    }

    function handleDragOver(event: DragEvent, index: number) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      if (dragIndex !== null && dragIndex !== index) {
        setDragOverIndex(index);
      }
    }

    function handleDrop(index: number) {
      if (dragIndex !== null && dragIndex !== index) {
        onReorder(path, dragIndex, index);
      }
      clearDragState();
    }

    return (
      <section className="admin-array">
        <div className="admin-array-head">
          <div>
            <h4>{labelFor(name, language)}</h4>
              <p>
                {language === "ar"
                  ? `${value.length} عنصر. استخدم مقبض السحب لتغيير الترتيب.`
                  : `${value.length} items. Use the drag handle to reorder.`}
              </p>
          </div>
          <button type="button" onClick={() => onChange(path, [...value, cloneTemplate(value[0] ?? "")])}>
            {language === "ar" ? "إضافة عنصر" : "Add item"}
          </button>
        </div>

        <div className={primitiveList ? "admin-list-editor" : "admin-array-list"}>
          {value.map((item, index) => {
            const fallback = `${labelFor(name, language)} ${index + 1}`;

            if (primitiveList) {
              return (
                <div
                  className={[
                    "admin-list-row",
                    dragIndex === index ? "is-dragging" : "",
                    dragOverIndex === index && dragIndex !== null && dragIndex !== index ? "is-drop-target" : "",
                  ].filter(Boolean).join(" ")}
                  key={`${path.join(".")}-${index}`}
                  onDragLeave={() => setDragOverIndex((current) => (current === index ? null : current))}
                  onDragOver={(event) => handleDragOver(event, index)}
                  onDrop={() => handleDrop(index)}
                >
                  <span
                    className="admin-drag-handle"
                    draggable
                    aria-label={language === "ar" ? "اسحب لتغيير ترتيب العنصر" : "Drag item to reorder"}
                    title={language === "ar" ? "اسحب لتغيير الترتيب" : "Drag to reorder"}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragEnd={clearDragState}
                  />
                  <FieldEditor
                    name={name}
                    value={item}
                    path={[...path, index]}
                    language={language}
                    onChange={onChange}
                    onReorder={onReorder}
                  />
                  <button
                    className="admin-remove"
                    type="button"
                    onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                  >
                    {language === "ar" ? "حذف" : "Delete"}
                  </button>
                </div>
              );
            }

            return (
              <details
                className={[
                  "admin-array-item",
                  dragIndex === index ? "is-dragging" : "",
                  dragOverIndex === index && dragIndex !== null && dragIndex !== index ? "is-drop-target" : "",
                ].filter(Boolean).join(" ")}
                key={`${path.join(".")}-${index}`}
                onDragLeave={() => setDragOverIndex((current) => (current === index ? null : current))}
                onDragOver={(event) => handleDragOver(event, index)}
                onDrop={() => handleDrop(index)}
              >
                <summary className="admin-item-summary">
                  <span
                    className="admin-drag-handle"
                    draggable
                    aria-label={language === "ar" ? "اسحب لتغيير ترتيب العنصر" : "Drag item to reorder"}
                    title={language === "ar" ? "اسحب لتغيير الترتيب" : "Drag to reorder"}
                    onClick={(event) => event.preventDefault()}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragEnd={clearDragState}
                  />
                  <span>
                    <strong>{itemTitle(item, fallback)}</strong>
                    <small>{fallback}</small>
                  </span>
                  <button
                    className="admin-remove"
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      onChange(path, value.filter((_, itemIndex) => itemIndex !== index));
                    }}
                  >
                    {language === "ar" ? "حذف" : "Delete"}
                  </button>
                </summary>
                <div className="admin-nested">
                  <FieldEditor
                    name={name}
                    value={item}
                    path={[...path, index]}
                    level={level + 1}
                    language={language}
                    onChange={onChange}
                    onReorder={onReorder}
                  />
                </div>
              </details>
            );
          })}
        </div>
      </section>
    );
  }

  if (isPlainObject(value)) {
    if (name === "seoPages") {
      return (
        <SeoPagesEditor
          value={value}
          path={path}
          level={level}
          language={language}
          onChange={onChange}
          onReorder={onReorder}
        />
      );
    }

    return (
      <section className={level === 0 ? "admin-object admin-object-root" : "admin-object"}>
        {level > 0 ? <h3>{labelFor(name, language)}</h3> : null}
        <div className="admin-field-grid">
          {orderedEntries(value).filter(({ key }) => shouldShowField(path, key)).map(({ key, value: item }) => (
            <FieldEditor
              key={`${path.join(".")}-${key}`}
              name={key}
              value={item}
              path={[...path, key]}
              level={level + 1}
              language={language}
              onChange={onChange}
              onReorder={onReorder}
            />
          ))}
        </div>
      </section>
    );
  }

  return null;
}
