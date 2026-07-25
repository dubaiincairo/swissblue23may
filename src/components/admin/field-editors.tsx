"use client";

import type { DragEvent } from "react";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Columns3,
  GripVertical,
  Images,
  LayoutGrid,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { RichEditor } from "@/components/rich-editor";
import { RephraseButton } from "@/components/rephrase-button";
import { StockPhotoPicker } from "@/components/stock-photo-picker";
import { TranslateButton } from "@/components/translate-button";
import { PAGE_KEYS, PAGE_NAMES } from "@/lib/page-seo";
import type { JsonObject, JsonValue, Language } from "./types";
import { labelFor, orderedEntries, shouldShowField } from "./sections";
import { cloneTemplate, isPlainObject, itemTitle } from "./content-path";
import {
  acceptsVideo,
  isImageField,
  isLogoField,
  isLongField,
  localizedImageGuidance,
  removeLogoBackground,
} from "./image-utils";

type UploadedAsset = {
  url: string;
  width?: number;
  height?: number;
  type?: string;
};

type UploadResponse = Partial<UploadedAsset> & {
  error?: string;
};

async function uploadSiteContentFile(file: File): Promise<UploadedAsset> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/site-content/upload", {
    body: formData,
    method: "POST",
  });
  const data = (await response.json()) as UploadResponse;

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? "Upload failed.");
  }

  return {
    url: data.url,
    width: data.width,
    height: data.height,
    type: data.type,
  };
}

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
  const [pickerSource, setPickerSource] = useState<
    "unsplash" | "pexels" | null
  >(null);
  const fieldLabel = fieldLabelFor(name, path, language);
  const uploadOnly =
    isHotelGalleryImage(path) || isHomepagePropertyPreviewImage(name, path);

  function handleStockSelect(asset: {
    url: string;
    width?: number;
    height?: number;
  }) {
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

    setUploadStatus(
      isLogoField(name) ? "Removing logo background..." : "Uploading image...",
    );

    try {
      const uploadFile =
        isLogoField(name) && file.type.startsWith("image/")
          ? await removeLogoBackground(file)
          : file;

      setUploadStatus("Uploading image...");
      const data = await uploadSiteContentFile(uploadFile);

      onChange(path, data.url);
      if (path.at(-1) === "source" && typeof data.type === "string") {
        onChange([...path.slice(0, -1), "kind"], data.type);
      }
      setUploadStatus(
        data.width && data.height
          ? language === "ar"
            ? `تم الرفع بحجم ${data.width} x ${data.height} بكسل${isLogoField(name) ? " مع خلفية شفافة" : ""}. احفظ التغييرات للنشر.`
            : `Uploaded ${data.width} x ${data.height}px${isLogoField(name) ? " with transparent background" : ""}. Save changes to publish.`
          : language === "ar"
            ? "تم الرفع. احفظ التغييرات للنشر."
            : "Uploaded. Save changes to publish.",
      );
    } catch (error) {
      setUploadStatus(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.",
      );
    }
  }

  return (
    <div
      className={`admin-field admin-image-field${name === "ogImage" ? " admin-image-field-og" : ""}`}
    >
      <span>{fieldLabel}</span>
      <div className="admin-image-control">
        <div className="admin-image-preview">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" />
          ) : (
            <span>
              {language === "ar" ? "لم يتم اختيار ملف" : "No photo selected"}
            </span>
          )}
        </div>
        <div className="admin-image-tools">
          <p>{localizedImageGuidance(name, path, language)}</p>
          <div className="admin-image-actions">
            <label className="admin-image-source-icon admin-image-source-upload">
              <Upload aria-hidden="true" size={16} strokeWidth={2} />
              <span>
                {language === "ar"
                  ? acceptsVideo(name, path)
                    ? "رفع ملف"
                    : "رفع صورة"
                  : acceptsVideo(name, path)
                    ? "Upload media"
                    : "Upload photo"}
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
            {uploadOnly ? null : (
              <>
                <button
                  type="button"
                  className="admin-image-source-icon admin-image-source-unsplash"
                  onClick={() => setPickerSource("unsplash")}
                  aria-label={
                    language === "ar" ? "ابحث في Unsplash" : "Search Unsplash"
                  }
                  title={
                    language === "ar" ? "ابحث في Unsplash" : "Search Unsplash"
                  }
                >
                  <Images aria-hidden="true" size={16} strokeWidth={2} />
                  <span>Unsplash</span>
                </button>
                <button
                  type="button"
                  className="admin-image-source-icon admin-image-source-pexels"
                  onClick={() => setPickerSource("pexels")}
                  aria-label={
                    language === "ar" ? "ابحث في Pexels" : "Search Pexels"
                  }
                  title={language === "ar" ? "ابحث في Pexels" : "Search Pexels"}
                >
                  <Images aria-hidden="true" size={16} strokeWidth={2} />
                  <span>Pexels</span>
                </button>
              </>
            )}
          </div>
          {uploadStatus ? <small>{uploadStatus}</small> : null}
        </div>
      </div>
      <input
        type="url"
        value={value}
        placeholder={
          language === "ar" ? "أو الصق رابط الملف" : "Or paste an image URL"
        }
        onChange={(event) => onChange(path, event.target.value)}
      />
      {pickerSource ? (
        <StockPhotoPicker
          language={language}
          initialQuery={fieldLabelFor(name, path, "en")}
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
  const fieldLabel = fieldLabelFor(name, path, language);

  if (isUrl) {
    return (
      <label className="admin-field">
        <span>{fieldLabel}</span>
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
        <span>{fieldLabel}</span>
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
          <span>{fieldLabel}</span>
          {!isOpaque ? (
            <span className="admin-field-actions">
              <RephraseButton
                value={value}
                language={language}
                path={path}
                isHtml
                onChange={onChange}
              />
              <TranslateButton
                value={value}
                sourceLanguage={language}
                path={path}
                isHtml
                onChange={onChange}
              />
            </span>
          ) : null}
        </span>
        <RichEditor
          value={value}
          onChange={(html) => onChange(path, html)}
          dir={language === "ar" ? "rtl" : "ltr"}
          ariaLabel={fieldLabel}
          language={language}
        />
      </div>
    );
  }

  return (
    <div className="admin-field">
      <span className="admin-field-label-row">
        <span>{fieldLabel}</span>
        {!isOpaque ? (
          <span className="admin-field-actions">
            <RephraseButton
              value={value}
              language={language}
              path={path}
              onChange={onChange}
            />
            <TranslateButton
              value={value}
              sourceLanguage={language}
              path={path}
              onChange={onChange}
            />
          </span>
        ) : null}
      </span>
      <input
        type="text"
        aria-label={fieldLabel}
        value={value}
        onChange={(event) => onChange(path, event.target.value)}
      />
    </div>
  );
}

function isHotelGalleryImage(path: Array<string | number>) {
  return (
    path.map(String).includes("properties") &&
    path.map(String).includes("gallery")
  );
}

function isHotelGalleryTitle(name: string, path: Array<string | number>) {
  return name === "title" && isHotelGalleryImage(path);
}

function isHomepagePropertyPreviewImage(
  name: string,
  path: Array<string | number>,
) {
  const pathText = path.map(String).join(".");

  return (
    name === "image" && /homepage\.properties\.items\.\d+\.image$/.test(pathText)
  );
}

function isHotelPageGalleryField(name: string, path: Array<string | number>) {
  const pathText = path.map(String).join(".");

  return (
    name === "gallery" &&
    /homepage\.properties\.items\.\d+\.gallery$/.test(pathText)
  );
}

function hotelGalleryTitleLabel(language: Language) {
  return language === "ar" ? "عنوان الصورة" : "Photo headline";
}

function homepagePropertyPreviewImageLabel(language: Language) {
  return language === "ar"
    ? "صورة نظرة عامة على الفندق"
    : "Hotel Overview photo";
}

function hotelPageGalleryLabel(language: Language) {
  return language === "ar"
    ? "صور معرض صفحة الفندق"
    : "Hotel page gallery photos";
}

function fieldLabelFor(
  name: string,
  path: Array<string | number>,
  language: Language,
) {
  if (isHotelGalleryTitle(name, path)) {
    return hotelGalleryTitleLabel(language);
  }

  if (isHomepagePropertyPreviewImage(name, path)) {
    return homepagePropertyPreviewImageLabel(language);
  }

  if (isHotelPageGalleryField(name, path)) {
    return hotelPageGalleryLabel(language);
  }

  return labelFor(name, language);
}

function visiblePropertyGalleryKeys(path: Array<string | number>, key: string) {
  const pathText = path.map(String).join(".");

  if (pathText.endsWith("homepage.properties")) {
    return key === "items";
  }

  if (/homepage\.properties\.items\.\d+$/.test(pathText)) {
    return ["title", "name", "city", "slug", "image", "gallery"].includes(key);
  }

  if (/homepage\.properties\.items\.\d+\.gallery\.\d+$/.test(pathText)) {
    return ["title", "image"].includes(key);
  }

  return true;
}

function uploadedGalleryTitle(index: number, language: Language) {
  return language === "ar"
    ? `صورة الفندق ${index + 1}`
    : `Hotel photo ${index + 1}`;
}

function galleryItemImage(item: JsonValue) {
  if (typeof item === "string") {
    return item;
  }

  if (isPlainObject(item) && typeof item.image === "string") {
    return item.image;
  }

  return "";
}

function galleryItemTitle(
  item: JsonValue,
  index: number,
  language: Language,
) {
  if (isPlainObject(item) && typeof item.title === "string" && item.title) {
    return item.title;
  }

  return uploadedGalleryTitle(index, language);
}

function moveArrayItem<T>(items: T[], from: number, to: number) {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= items.length ||
    to >= items.length
  ) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(from, 1);
  if (typeof moved === "undefined") {
    return items;
  }
  next.splice(to, 0, moved);

  return next;
}

function HotelGalleryBulkUpload({
  value,
  path,
  language,
  onChange,
}: {
  value: JsonValue[];
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
}) {
  const [status, setStatus] = useState("");

  async function uploadFiles(
    files: FileList | null,
    mode: "append" | "replace",
  ) {
    const selectedFiles = Array.from(files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (selectedFiles.length === 0) {
      setStatus(
        language === "ar"
          ? "اختر صور الفندق أولاً."
          : "Choose hotel photos first.",
      );
      return;
    }

    try {
      const uploadedItems: JsonObject[] = [];

      for (const [index, file] of selectedFiles.entries()) {
        setStatus(
          language === "ar"
            ? `جاري رفع الصورة ${index + 1} من ${selectedFiles.length}...`
            : `Uploading photo ${index + 1} of ${selectedFiles.length}...`,
        );
        const asset = await uploadSiteContentFile(file);

        uploadedItems.push({
          title: uploadedGalleryTitle(
            mode === "replace" ? index : value.length + index,
            language,
          ),
          image: asset.url,
        });
      }

      const existingImages = new Set(
        value.map(galleryItemImage).filter(Boolean),
      );
      const nextUploads = uploadedItems.filter((item) => {
        const image = typeof item.image === "string" ? item.image : "";

        return image && (mode === "replace" || !existingImages.has(image));
      });
      const nextValue =
        mode === "replace" ? nextUploads : [...value, ...nextUploads];

      onChange(path, nextValue);
      setStatus(
        language === "ar"
          ? mode === "replace"
            ? `تم استبدال المعرض بـ ${nextUploads.length} صور. احفظ التغييرات للنشر.`
            : `تمت إضافة ${nextUploads.length} صور. احفظ التغييرات للنشر.`
          : mode === "replace"
            ? `Replaced gallery with ${nextUploads.length} photos. Save changes to publish.`
            : `Added ${nextUploads.length} photos. Save changes to publish.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : language === "ar"
            ? "فشل رفع الصور. حاول مرة أخرى."
            : "Photo upload failed. Please try again.",
      );
    }
  }

  return (
    <div className="admin-gallery-bulk-upload">
      <div>
        <strong>
          {language === "ar"
            ? "تحديث صور الفندق دفعة واحدة"
            : "Bulk update hotel photos"}
        </strong>
        <small>
          {language === "ar"
            ? "ارفع صور الفندق الحقيقية فقط. يمكنك تعديل عنوان كل صورة بعد الرفع."
            : "Upload real hotel photos only. You can edit each photo headline after upload."}
        </small>
      </div>
      <div className="admin-gallery-bulk-actions">
        <label className="admin-gallery-bulk-button">
          <Plus aria-hidden="true" size={16} strokeWidth={2.3} />
          <span>{language === "ar" ? "إضافة صور" : "Add photos"}</span>
          <input
            accept="image/avif,image/jpeg,image/png,image/webp"
            multiple
            type="file"
            onChange={(event) => {
              const input = event.currentTarget;

              void uploadFiles(input.files, "append").finally(() => {
                input.value = "";
              });
            }}
          />
        </label>
        <label className="admin-gallery-bulk-button is-danger">
          <Upload aria-hidden="true" size={16} strokeWidth={2.3} />
          <span>
            {language === "ar" ? "استبدال المعرض" : "Replace gallery"}
          </span>
          <input
            accept="image/avif,image/jpeg,image/png,image/webp"
            multiple
            type="file"
            onChange={(event) => {
              const input = event.currentTarget;

              void uploadFiles(input.files, "replace").finally(() => {
                input.value = "";
              });
            }}
          />
        </label>
      </div>
      {status ? (
        <small className="admin-gallery-bulk-status">{status}</small>
      ) : null}
    </div>
  );
}

function PropertyGalleriesEditor({
  value,
  path,
  language,
  onChange,
  onReorder,
  focusItem,
}: {
  value: JsonObject;
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
  focusItem?: string;
}) {
  const properties = Array.isArray(value.items) ? value.items : [];
  const firstProperty = properties.find(
    (property) => isPlainObject(property) && typeof property.slug === "string",
  );
  const firstSlug =
    isPlainObject(firstProperty) && typeof firstProperty.slug === "string"
      ? firstProperty.slug
      : "";
  const [selectedSlug, setSelectedSlug] = useState(focusItem ?? firstSlug);
  const activeIndex = Math.max(
    0,
    properties.findIndex(
      (property) =>
        isPlainObject(property) &&
        property.slug === (selectedSlug || focusItem || firstSlug),
    ),
  );
  const activeProperty = isPlainObject(properties[activeIndex])
    ? properties[activeIndex]
    : null;
  const activePropertyPath = [...path, "items", activeIndex];
  const activeGallery = Array.isArray(activeProperty?.gallery)
    ? activeProperty.gallery
    : [];
  const [arrangeOpen, setArrangeOpen] = useState(false);

  if (!activeProperty) {
    return (
      <div className="content-card">
        {language === "ar"
          ? "لا توجد فنادق قابلة للتحرير."
          : "No hotels available to edit."}
      </div>
    );
  }

  return (
    <section className="admin-property-gallery-editor">
      <div className="admin-property-gallery-selector">
        {properties.map((property, index) => {
          if (!isPlainObject(property)) {
            return null;
          }

          const slug = typeof property.slug === "string" ? property.slug : "";
          const title = itemTitle(
            property,
            language === "ar" ? `فندق ${index + 1}` : `Hotel ${index + 1}`,
          );
          const city = typeof property.city === "string" ? property.city : "";
          const image = typeof property.image === "string" ? property.image : "";
          const galleryCount = Array.isArray(property.gallery)
            ? property.gallery.length
            : 0;
          const isSelected = index === activeIndex;

          return (
            <button
              aria-pressed={isSelected}
              className={`admin-property-gallery-tab${isSelected ? " is-selected" : ""}`}
              key={slug || index}
              type="button"
              onClick={() => setSelectedSlug(slug)}
            >
              <span className="admin-property-gallery-tab-photo">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="" />
                ) : null}
              </span>
              <span>
                <strong>{title}</strong>
                <small>
                  {city}
                  {city ? " · " : ""}
                  {language === "ar"
                    ? `${galleryCount} صور`
                    : `${galleryCount} photos`}
                </small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="admin-property-gallery-workspace">
        <div className="admin-property-gallery-heading">
          <div>
            <p className="admin-kicker">
              {language === "ar" ? "الفندق المحدد" : "Selected hotel"}
            </p>
            <h4>{itemTitle(activeProperty, "Hotel")}</h4>
            <span>
              {typeof activeProperty.city === "string" ? activeProperty.city : ""}
            </span>
          </div>
          <span className="admin-property-gallery-count">
            {language === "ar"
              ? `${activeGallery.length} صور داخلية`
              : `${activeGallery.length} detail photos`}
          </span>
        </div>

        <div className="admin-property-gallery-panel">
          <ImageFieldEditor
            name="image"
            value={typeof activeProperty.image === "string" ? activeProperty.image : ""}
            path={[...activePropertyPath, "image"]}
            language={language}
            onChange={onChange}
          />
        </div>

        <div className="admin-property-gallery-panel">
          <div className="admin-property-gallery-panel-head">
            <div>
              <h5>{hotelPageGalleryLabel(language)}</h5>
              <p>
                {language === "ar"
                  ? "هذه الصور تظهر فقط داخل صفحة الفندق بعد أن يفتحها الزائر."
                  : "These photos appear only inside the hotel detail page after the visitor opens it."}
              </p>
            </div>
            <div className="admin-property-gallery-panel-actions">
              <button
                type="button"
                onClick={() => setArrangeOpen(true)}
                disabled={activeGallery.length < 2}
              >
                <Images aria-hidden="true" size={16} strokeWidth={2.3} />
                {language === "ar" ? "ترتيب الصور" : "Arrange photos"}
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange([...activePropertyPath, "gallery"], [
                    ...activeGallery,
                    {
                      title: uploadedGalleryTitle(activeGallery.length, language),
                      image: "",
                    },
                  ])
                }
              >
                <Plus aria-hidden="true" size={16} strokeWidth={2.3} />
                {language === "ar" ? "إضافة صورة" : "Add photo"}
              </button>
            </div>
          </div>
          {arrangeOpen ? (
            <HotelGalleryArrangeModal
              value={activeGallery}
              propertyTitle={itemTitle(activeProperty, "Hotel")}
              language={language}
              onClose={() => setArrangeOpen(false)}
              onChange={(nextValue) =>
                onChange([...activePropertyPath, "gallery"], nextValue)
              }
            />
          ) : null}
          <HotelGalleryBulkUpload
            value={activeGallery}
            path={[...activePropertyPath, "gallery"]}
            language={language}
            onChange={onChange}
          />
          <HotelGalleryItemList
            value={activeGallery}
            path={[...activePropertyPath, "gallery"]}
            language={language}
            onChange={onChange}
            onReorder={onReorder}
          />
        </div>
      </div>
    </section>
  );
}

function HotelGalleryArrangeModal({
  value,
  propertyTitle,
  language,
  onClose,
  onChange,
}: {
  value: JsonValue[];
  propertyTitle: string;
  language: Language;
  onClose: () => void;
  onChange: (value: JsonValue[]) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const titleId = `admin-gallery-arrange-${propertyTitle.replace(/\W+/g, "-").toLowerCase() || "hotel"}`;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function clearDragState() {
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleDrop(index: number) {
    if (dragIndex !== null && dragIndex !== index) {
      onChange(moveArrayItem(value, dragIndex, index));
    }
    clearDragState();
  }

  return (
    <div
      className="admin-gallery-arrange-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="admin-gallery-arrange-modal"
        dir={language === "ar" ? "rtl" : "ltr"}
        role="dialog"
      >
        <header className="admin-gallery-arrange-header">
          <div>
            <p className="admin-kicker">
              {language === "ar" ? "ترتيب معرض الفندق" : "Hotel gallery order"}
            </p>
            <h3 id={titleId}>{propertyTitle}</h3>
            <span>
              {language === "ar"
                ? "اسحب الصور داخل الشبكة لترتيبها بسهولة."
                : "Drag photos in the grid to arrange them easily."}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === "ar" ? "إغلاق" : "Close"}
          >
            <X aria-hidden="true" size={20} strokeWidth={2.2} />
          </button>
        </header>

        <div className="admin-gallery-arrange-grid">
          {value.map((item, index) => {
            const image = galleryItemImage(item);
            const title = galleryItemTitle(item, index, language);

            return (
              <article
                className={[
                  "admin-gallery-arrange-tile",
                  dragIndex === index ? "is-dragging" : "",
                  dragOverIndex === index &&
                  dragIndex !== null &&
                  dragIndex !== index
                    ? "is-drop-target"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                draggable
                key={`${image || title}-${index}`}
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("text/plain", String(index));
                  setDragIndex(index);
                  setDragOverIndex(null);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  if (dragIndex !== null && dragIndex !== index) {
                    setDragOverIndex(index);
                  }
                }}
                onDragLeave={() =>
                  setDragOverIndex((current) =>
                    current === index ? null : current,
                  )
                }
                onDrop={() => handleDrop(index)}
                onDragEnd={clearDragState}
              >
                <span className="admin-gallery-arrange-number">
                  {index + 1}
                </span>
                <div className="admin-gallery-arrange-image">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt="" />
                  ) : (
                    <Images aria-hidden="true" size={30} strokeWidth={1.9} />
                  )}
                </div>
                <div className="admin-gallery-arrange-title">
                  <GripVertical aria-hidden="true" size={16} strokeWidth={2.2} />
                  <span>{title}</span>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="admin-gallery-arrange-footer">
          <span>
            {language === "ar"
              ? "احفظ التغييرات بعد إغلاق النافذة لنشر الترتيب."
              : "Save changes after closing the window to publish this order."}
          </span>
          <button type="button" onClick={onClose}>
            {language === "ar" ? "تم" : "Done"}
          </button>
        </footer>
      </section>
    </div>
  );
}

function HotelGalleryItemList({
  value,
  path,
  language,
  onChange,
  onReorder,
}: {
  value: JsonValue[];
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function clearDragState() {
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function normalizedItem(item: JsonValue, index: number): JsonObject {
    if (isPlainObject(item)) {
      return {
        title:
          typeof item.title === "string"
            ? item.title
            : uploadedGalleryTitle(index, language),
        image: typeof item.image === "string" ? item.image : "",
      };
    }

    return {
      title: uploadedGalleryTitle(index, language),
      image: typeof item === "string" ? item : "",
    };
  }

  if (value.length === 0) {
    return (
      <div className="admin-gallery-empty">
        {language === "ar"
          ? "لا توجد صور داخلية بعد. ارفع صور الفندق دفعة واحدة أو أضف صورة."
          : "No detail photos yet. Bulk upload hotel photos or add one photo."}
      </div>
    );
  }

  return (
    <div className="admin-gallery-flat-list">
      {value.map((item, index) => {
        const current = normalizedItem(item, index);

        return (
          <div
            className={[
              "admin-gallery-flat-item",
              dragIndex === index ? "is-dragging" : "",
              dragOverIndex === index &&
              dragIndex !== null &&
              dragIndex !== index
                ? "is-drop-target"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={`${path.join(".")}-${index}`}
            onDragLeave={() =>
              setDragOverIndex((currentIndex) =>
                currentIndex === index ? null : currentIndex,
              )
            }
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              if (dragIndex !== null && dragIndex !== index) {
                setDragOverIndex(index);
              }
            }}
            onDrop={() => {
              if (dragIndex !== null && dragIndex !== index) {
                onReorder(path, dragIndex, index);
              }
              clearDragState();
            }}
          >
            <span
              className="admin-drag-handle"
              draggable
              aria-label={
                language === "ar"
                  ? "اسحب لتغيير ترتيب الصورة"
                  : "Drag photo to reorder"
              }
              title={
                language === "ar"
                  ? "اسحب لتغيير الترتيب"
                  : "Drag to reorder"
              }
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/plain", String(index));
                setDragIndex(index);
                setDragOverIndex(null);
              }}
              onDragEnd={clearDragState}
            >
              <GripVertical aria-hidden="true" size={20} strokeWidth={2.2} />
            </span>

            <div className="admin-gallery-flat-fields">
              <label className="admin-field">
                <span>{hotelGalleryTitleLabel(language)}</span>
                <input
                  type="text"
                  value={String(current.title ?? "")}
                  onChange={(event) =>
                    onChange([...path, index], {
                      ...current,
                      title: event.target.value,
                    })
                  }
                />
              </label>
              <ImageFieldEditor
                name="image"
                value={String(current.image ?? "")}
                path={[...path, index, "image"]}
                language={language}
                onChange={(_, nextValue) =>
                  onChange([...path, index], {
                    ...current,
                    image: typeof nextValue === "string" ? nextValue : "",
                  })
                }
              />
            </div>

            <button
              className="admin-remove admin-icon-button"
              type="button"
              onClick={() =>
                onChange(
                  path,
                  value.filter((_, itemIndex) => itemIndex !== index),
                )
              }
              aria-label={
                language === "ar"
                  ? `حذف الصورة ${index + 1}`
                  : `Delete photo ${index + 1}`
              }
              title={language === "ar" ? "حذف الصورة" : "Delete photo"}
            >
              <Trash2 aria-hidden="true" size={18} strokeWidth={2.1} />
            </button>
          </div>
        );
      })}
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

const ADMIN_AUTH_LAYOUT_OPTIONS = [
  { value: "tiles", en: "Editorial tiles", ar: "بلاطات تحريرية" },
  { value: "slices", en: "Vertical slices", ar: "شرائح عمودية" },
] as const;

function isAdminAuthBackdropPath(path: Array<string | number>) {
  return path.some((segment) => segment === "adminAuthBackdrop");
}

function AdminAuthBackdropLayoutField({
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
  const selected = value === "slices" ? "slices" : "tiles";

  return (
    <fieldset className="admin-layout-field">
      <legend>{labelFor(name, language)}</legend>
      <div className="admin-layout-options">
        {ADMIN_AUTH_LAYOUT_OPTIONS.map((option) => (
          <button
            aria-pressed={selected === option.value}
            className={`admin-layout-option${selected === option.value ? " is-selected" : ""}`}
            key={option.value}
            type="button"
            onClick={() => onChange(path, option.value)}
          >
            <span className="admin-layout-preview" aria-hidden="true">
              {option.value === "tiles" ? (
                <LayoutGrid size={30} strokeWidth={1.8} />
              ) : (
                <Columns3 size={30} strokeWidth={1.8} />
              )}
            </span>
            <span>{language === "ar" ? option.ar : option.en}</span>
          </button>
        ))}
      </div>
      <small>
        {language === "ar"
          ? "اختر البلاطات المتوازنة أو الشرائح العمودية الطويلة."
          : "Choose a balanced tile grid or tall vertical slices."}
      </small>
    </fieldset>
  );
}

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
  const isAdminAuthPhoto = isAdminAuthBackdropPath(path);

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
          ? isAdminAuthPhoto
            ? "حدد الجزء الذي يبقى ظاهرًا عند اقتصاص صورة الخلفية."
            : "الجزء الذي يبقى ظاهرًا عند اقتصاص الصورة في عرض الجوال."
          : isAdminAuthPhoto
            ? "Choose which part stays visible when this background photo is cropped."
            : "Which part of the photo stays in view when it's cropped on mobile."}
      </small>
    </label>
  );
}

const SEO_PAGE_FIELDS = ["title", "description", "ogImage"] as const;

function humanizePageKey(key: string) {
  return (
    key
      .split("-")
      .filter(Boolean)
      .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
      .join(" ") || key
  );
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
  const [selectedPageKey, setSelectedPageKey] = useState(
    PAGE_KEYS[0] ?? "home",
  );
  const allPageKeys = Array.from(
    new Set([...PAGE_KEYS, ...Object.keys(value)]),
  );
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const pageItems = allPageKeys.map((key) => {
    const names = PAGE_NAMES[key] ?? {
      en: humanizePageKey(key),
      ar: humanizePageKey(key),
    };
    const pageValue = isPlainObject(value[key]) ? value[key] : {};
    const completedFields = SEO_PAGE_FIELDS.filter((field) =>
      seoFieldValue(pageValue, field).trim(),
    ).length;
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
      .some((candidate) =>
        candidate.toLocaleLowerCase().includes(normalizedQuery),
      );
  });
  const selectedPageVisible = filteredPageItems.some(
    (page) => page.key === selectedPageKey,
  );
  const activePageKey = selectedPageVisible
    ? selectedPageKey
    : filteredPageItems[0]?.key;
  const activePage = pageItems.find((page) => page.key === activePageKey);
  const activeValue =
    activePageKey && isPlainObject(value[activePageKey])
      ? value[activePageKey]
      : {};

  function handleSelectedPageChange(
    fieldPath: Array<string | number>,
    nextValue: JsonValue,
  ) {
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
    <section
      className="admin-seo-pages"
      aria-label={language === "ar" ? "تحسين الصفحات" : "Per-page SEO"}
    >
      <div className="admin-seo-pages-toolbar">
        <label className="admin-seo-search">
          <span>{language === "ar" ? "البحث عن صفحة" : "Find a page"}</span>
          <input
            type="search"
            value={query}
            placeholder={
              language === "ar"
                ? "اكتب اسم الصفحة أو الرابط"
                : "Type a page name or route"
            }
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="admin-seo-result-count" aria-live="polite">
          <strong>{filteredPageItems.length}</strong>
          <span>
            {language === "ar"
              ? "صفحة"
              : filteredPageItems.length === 1
                ? "page"
                : "pages"}
          </span>
        </div>
      </div>

      <div className="admin-seo-pages-grid">
        <nav
          className="admin-seo-page-list"
          aria-label={language === "ar" ? "الصفحات" : "Pages"}
        >
          {filteredPageItems.length ? (
            filteredPageItems.map((page) => (
              <button
                key={page.key}
                type="button"
                className={
                  page.key === activePageKey
                    ? "admin-seo-page-button is-active"
                    : "admin-seo-page-button"
                }
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
              {language === "ar"
                ? "لا توجد صفحة بهذا البحث."
                : "No pages match this search."}
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
              {language === "ar"
                ? "اختر صفحة لتعديل بياناتها."
                : "Select a page to edit its SEO."}
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

type OrderedField = ReturnType<typeof orderedEntries>[number];

function isNestedValue(value: JsonValue) {
  return Array.isArray(value) || isPlainObject(value);
}

function fieldGroupLabel(entries: OrderedField[], language: Language) {
  const keys = entries.map(({ key }) => key);
  const includes = (...values: string[]) =>
    values.some((value) => keys.includes(value));
  const hasKeyPart = (...parts: string[]) =>
    keys.some((key) =>
      parts.some((part) => key.toLowerCase().includes(part.toLowerCase())),
    );

  if (
    includes(
      "continue",
      "back",
      "submit",
      "success",
      "error",
      "closeModal",
      "summaryHeading",
    ) ||
    hasKeyPart("button", "cta")
  ) {
    return language === "ar"
      ? "الأزرار ورسائل النموذج"
      : "Actions and form messages";
  }

  if (hasKeyPart("step")) {
    return language === "ar"
      ? "خطوات النموذج والإرشادات"
      : "Form steps and guidance";
  }

  if (hasKeyPart("placeholder", "option")) {
    return language === "ar"
      ? "تعليمات وخيارات الحقول"
      : "Field prompts and options";
  }

  if (includes("eyebrow", "title", "text", "description", "note")) {
    return language === "ar"
      ? "المقدمة والمحتوى الرئيسي"
      : "Introduction and main content";
  }

  return language === "ar" ? "محتوى عام" : "General content";
}

function groupLongRootFields(entries: OrderedField[]) {
  const segments: Array<
    | { kind: "field"; entry: OrderedField }
    | { kind: "group"; entries: OrderedField[] }
  > = [];
  let primitiveRun: OrderedField[] = [];

  function flushPrimitiveRun() {
    if (primitiveRun.length === 1) {
      segments.push({ kind: "field", entry: primitiveRun[0] });
    } else if (primitiveRun.length > 1) {
      segments.push({ kind: "group", entries: primitiveRun });
    }
    primitiveRun = [];
  }

  entries.forEach((entry) => {
    if (isNestedValue(entry.value)) {
      flushPrimitiveRun();
      segments.push({ kind: "field", entry });
    } else {
      primitiveRun.push(entry);
    }
  });
  flushPrimitiveRun();

  return segments;
}

function PrimitiveListValueEditor({
  name,
  value,
  index,
  path,
  language,
  onChange,
}: {
  name: string;
  value: JsonValue;
  index: number;
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
}) {
  const itemLabel =
    language === "ar" ? `العنصر ${index + 1}` : `Item ${index + 1}`;

  if (typeof value === "boolean") {
    return (
      <label className="admin-list-value admin-check">
        <input
          checked={value}
          type="checkbox"
          onChange={(event) => onChange(path, event.target.checked)}
        />
        <span>{itemLabel}</span>
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="admin-list-value">
        <span>{itemLabel}</span>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
        />
      </label>
    );
  }

  const stringValue = typeof value === "string" ? value : "";
  const useTextarea = isLongField(name, stringValue) || stringValue.length > 96;

  if (typeof value === "string" && isHotelGalleryImage(path)) {
    return (
      <div className="admin-list-value admin-list-value-image">
        <ImageFieldEditor
          name={name}
          value={value}
          path={path}
          language={language}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className="admin-list-value">
      <div className="admin-list-value-head">
        <span>{itemLabel}</span>
        <span className="admin-field-actions">
          <RephraseButton
            value={stringValue}
            language={language}
            path={path}
            onChange={onChange}
          />
          <TranslateButton
            value={stringValue}
            sourceLanguage={language}
            path={path}
            onChange={onChange}
          />
        </span>
      </div>
      {useTextarea ? (
        <textarea
          aria-label={itemLabel}
          rows={2}
          value={stringValue}
          onChange={(event) => onChange(path, event.target.value)}
        />
      ) : (
        <input
          aria-label={itemLabel}
          type="text"
          value={stringValue}
          onChange={(event) => onChange(path, event.target.value)}
        />
      )}
    </div>
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
  focusItem,
  isFocusedItem = false,
  galleryOnly = false,
}: {
  name: string;
  value: JsonValue;
  path: Array<string | number>;
  level?: number;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
  focusItem?: string;
  isFocusedItem?: boolean;
  galleryOnly?: boolean;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (typeof value === "string" || typeof value === "number") {
    const stringValue = String(value);

    if (
      typeof value === "string" &&
      name === "layout" &&
      isAdminAuthBackdropPath(path)
    ) {
      return (
        <AdminAuthBackdropLayoutField
          name={name}
          value={value}
          path={path}
          language={language}
          onChange={onChange}
        />
      );
    }

    if (typeof value === "string" && name === "focus") {
      return (
        <FocalFieldEditor
          name={name}
          value={value}
          path={path}
          language={language}
          onChange={onChange}
        />
      );
    }

    if (typeof value === "string" && isImageField(name, path, value)) {
      return (
        <ImageFieldEditor
          name={name}
          value={value}
          path={path}
          language={language}
          onChange={onChange}
        />
      );
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
    const primitiveList = value.every(
      (item) => !isPlainObject(item) && !Array.isArray(item),
    );
    const isFixedAdminAuthPhotos =
      name === "photos" && isAdminAuthBackdropPath(path);
    const isPropertyList = name === "items" && path.includes("properties");
    const isGalleryOnlyPropertyList = galleryOnly && isPropertyList;
    const isHotelGalleryArray = isHotelPageGalleryField(name, path);
    const openForDirectLink = Boolean(
      (isPropertyList && focusItem) || (name === "gallery" && isFocusedItem),
    );

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
      <details
        className="admin-array admin-editor-fold"
        open={openForDirectLink || undefined}
      >
        <summary className="admin-fold-summary">
          <span className="admin-fold-summary-main">
            <span>
              <strong>{fieldLabelFor(name, path, language)}</strong>
              <small>
                {language === "ar"
                  ? `${value.length} عنصر${value.length === 0 ? "" : " · يدعم السحب والترتيب"}`
                  : `${value.length} items${value.length === 0 ? "" : " · drag to reorder"}`}
              </small>
            </span>
          </span>
          <ChevronDown
            className="admin-fold-chevron"
            aria-hidden="true"
            size={19}
            strokeWidth={2.2}
          />
        </summary>

        <div className="admin-fold-body">
          {isFixedAdminAuthPhotos || isGalleryOnlyPropertyList ? null : (
            <div className="admin-array-toolbar">
              <button
                type="button"
                onClick={() =>
                  onChange(path, [...value, cloneTemplate(value[0] ?? "")])
                }
              >
                <Plus aria-hidden="true" size={16} strokeWidth={2.3} />
                {language === "ar" ? "إضافة عنصر" : "Add item"}
              </button>
            </div>
          )}

          {isHotelGalleryArray ? (
            <HotelGalleryBulkUpload
              value={value}
              path={path}
              language={language}
              onChange={onChange}
            />
          ) : null}

          <div
            className={primitiveList ? "admin-list-editor" : "admin-array-list"}
          >
            {value.map((item, index) => {
              const fallback = `${fieldLabelFor(name, path, language)} ${
                index + 1
              }`;
              const itemSlug =
                isPlainObject(item) && typeof item.slug === "string"
                  ? item.slug
                  : undefined;
              const isDirectItem = Boolean(focusItem && itemSlug === focusItem);

              if (primitiveList) {
                return (
                  <div
                    className={[
                      "admin-list-row",
                      dragIndex === index ? "is-dragging" : "",
                      dragOverIndex === index &&
                      dragIndex !== null &&
                      dragIndex !== index
                        ? "is-drop-target"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={`${path.join(".")}-${index}`}
                    onDragLeave={() =>
                      setDragOverIndex((current) =>
                        current === index ? null : current,
                      )
                    }
                    onDragOver={(event) => handleDragOver(event, index)}
                    onDrop={() => handleDrop(index)}
                  >
                    <span
                      className="admin-drag-handle"
                      draggable
                      aria-label={
                        language === "ar"
                          ? "اسحب لتغيير ترتيب العنصر"
                          : "Drag item to reorder"
                      }
                      title={
                        language === "ar"
                          ? "اسحب لتغيير الترتيب"
                          : "Drag to reorder"
                      }
                      onDragStart={(event) => handleDragStart(event, index)}
                      onDragEnd={clearDragState}
                    >
                      <GripVertical
                        aria-hidden="true"
                        size={20}
                        strokeWidth={2.2}
                      />
                    </span>
                    <PrimitiveListValueEditor
                      name={name}
                      value={item}
                      index={index}
                      path={[...path, index]}
                      language={language}
                      onChange={onChange}
                    />
                    {isFixedAdminAuthPhotos ||
                    isGalleryOnlyPropertyList ? null : (
                      <button
                        className="admin-remove admin-icon-button"
                        type="button"
                        onClick={() =>
                          onChange(
                            path,
                            value.filter((_, itemIndex) => itemIndex !== index),
                          )
                        }
                        aria-label={
                          language === "ar"
                            ? `حذف العنصر ${index + 1}`
                            : `Delete item ${index + 1}`
                        }
                        title={language === "ar" ? "حذف العنصر" : "Delete item"}
                      >
                        <Trash2
                          aria-hidden="true"
                          size={18}
                          strokeWidth={2.1}
                        />
                      </button>
                    )}
                  </div>
                );
              }

              return (
                <details
                  className={[
                    "admin-array-item",
                    dragIndex === index ? "is-dragging" : "",
                    dragOverIndex === index &&
                    dragIndex !== null &&
                    dragIndex !== index
                      ? "is-drop-target"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={`${path.join(".")}-${index}`}
                  id={isDirectItem ? `admin-property-${itemSlug}` : undefined}
                  open={isDirectItem || undefined}
                  onDragLeave={() =>
                    setDragOverIndex((current) =>
                      current === index ? null : current,
                    )
                  }
                  onDragOver={(event) => handleDragOver(event, index)}
                  onDrop={() => handleDrop(index)}
                >
                  <summary className="admin-item-summary">
                    <span
                      className="admin-drag-handle"
                      draggable
                      aria-label={
                        language === "ar"
                          ? "اسحب لتغيير ترتيب العنصر"
                          : "Drag item to reorder"
                      }
                      title={
                        language === "ar"
                          ? "اسحب لتغيير الترتيب"
                          : "Drag to reorder"
                      }
                      onClick={(event) => event.preventDefault()}
                      onDragStart={(event) => handleDragStart(event, index)}
                      onDragEnd={clearDragState}
                    >
                      <GripVertical
                        aria-hidden="true"
                        size={20}
                        strokeWidth={2.2}
                      />
                    </span>
                    <span>
                      <strong>{itemTitle(item, fallback)}</strong>
                      <small>{fallback}</small>
                    </span>
                    {isFixedAdminAuthPhotos ||
                    isGalleryOnlyPropertyList ? null : (
                      <button
                        className="admin-remove admin-icon-button"
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          onChange(
                            path,
                            value.filter((_, itemIndex) => itemIndex !== index),
                          );
                        }}
                        aria-label={
                          language === "ar"
                            ? `حذف العنصر ${index + 1}`
                            : `Delete item ${index + 1}`
                        }
                        title={language === "ar" ? "حذف العنصر" : "Delete item"}
                      >
                        <Trash2
                          aria-hidden="true"
                          size={18}
                          strokeWidth={2.1}
                        />
                      </button>
                    )}
                    <ChevronDown
                      className="admin-fold-chevron"
                      aria-hidden="true"
                      size={18}
                      strokeWidth={2.2}
                    />
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
                      focusItem={focusItem}
                      isFocusedItem={isFocusedItem || isDirectItem}
                      galleryOnly={galleryOnly || name === "propertyGalleries"}
                    />
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </details>
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

    if (name === "propertyGalleries") {
      return (
        <PropertyGalleriesEditor
          value={value}
          path={path}
          language={language}
          onChange={onChange}
          onReorder={onReorder}
          focusItem={focusItem}
        />
      );
    }

    const propertyGalleryOnly = galleryOnly || name === "propertyGalleries";
    const entries = orderedEntries(value)
      .filter(({ key }) => shouldShowField(path, key))
      .filter(({ key }) =>
        propertyGalleryOnly ? visiblePropertyGalleryKeys(path, key) : true,
      );
    const isArrayItemObject = typeof path.at(-1) === "number";

    if (level > 0 && !isArrayItemObject) {
      return (
        <details className="admin-object admin-editor-fold">
          <summary className="admin-fold-summary">
            <span className="admin-fold-summary-main">
              <span>
                <strong>{fieldLabelFor(name, path, language)}</strong>
                <small>
                  {language === "ar"
                    ? `${entries.length} حقول`
                    : `${entries.length} fields`}
                </small>
              </span>
            </span>
            <ChevronDown
              className="admin-fold-chevron"
              aria-hidden="true"
              size={19}
              strokeWidth={2.2}
            />
          </summary>
          <div className="admin-fold-body">
            <div className="admin-field-grid">
              {entries.map(({ key, value: item }) => (
                <FieldEditor
                  key={`${path.join(".")}-${key}`}
                  name={key}
                  value={item}
                  path={[...path, key]}
                  level={level + 1}
                  language={language}
                  onChange={onChange}
                  onReorder={onReorder}
                  focusItem={focusItem}
                  isFocusedItem={isFocusedItem}
                  galleryOnly={propertyGalleryOnly}
                />
              ))}
            </div>
          </div>
        </details>
      );
    }

    const useProgressiveDisclosure = level === 0 && entries.length >= 8;
    const segments = useProgressiveDisclosure
      ? groupLongRootFields(entries)
      : entries.map((entry) => ({ kind: "field" as const, entry }));

    return (
      <section
        className={
          level === 0
            ? "admin-object admin-object-root"
            : "admin-object admin-object-inline"
        }
      >
        <div className="admin-field-grid">
          {segments.map((segment, index) => {
            if (segment.kind === "group") {
              return (
                <details
                  className="admin-editor-fold admin-field-group"
                  key={`${path.join(".")}-group-${index}`}
                >
                  <summary className="admin-fold-summary">
                    <span className="admin-fold-summary-main">
                      <span>
                        <strong>
                          {fieldGroupLabel(segment.entries, language)}
                        </strong>
                        <small>
                          {language === "ar"
                            ? `${segment.entries.length} حقول`
                            : `${segment.entries.length} fields`}
                        </small>
                      </span>
                    </span>
                    <ChevronDown
                      className="admin-fold-chevron"
                      aria-hidden="true"
                      size={19}
                      strokeWidth={2.2}
                    />
                  </summary>
                  <div className="admin-fold-body">
                    <div className="admin-field-grid">
                      {segment.entries.map(({ key, value: item }) => (
                        <FieldEditor
                          key={`${path.join(".")}-${key}`}
                          name={key}
                          value={item}
                          path={[...path, key]}
                          level={level + 1}
                          language={language}
                          onChange={onChange}
                          onReorder={onReorder}
                          focusItem={focusItem}
                          isFocusedItem={isFocusedItem}
                          galleryOnly={propertyGalleryOnly}
                        />
                      ))}
                    </div>
                  </div>
                </details>
              );
            }

            const { key, value: item } = segment.entry;
            return (
              <FieldEditor
                key={`${path.join(".")}-${key}`}
                name={key}
                value={item}
                path={[...path, key]}
                level={level + 1}
                language={language}
                onChange={onChange}
                onReorder={onReorder}
                focusItem={focusItem}
                isFocusedItem={isFocusedItem}
                galleryOnly={propertyGalleryOnly}
              />
            );
          })}
        </div>
      </section>
    );
  }

  return null;
}
