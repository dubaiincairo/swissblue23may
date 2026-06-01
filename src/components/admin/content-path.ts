// Pure helpers for reading/writing the content tree by path.
import type { JsonObject, JsonValue, Language } from "./types";

export function getAtPath(value: JsonValue, path: Array<string | number>): JsonValue {
  return path.reduce<JsonValue>((current, segment) => {
    if (Array.isArray(current)) {
      return current[segment as number];
    }

    if (current && typeof current === "object") {
      return (current as JsonObject)[segment as string];
    }

    return null;
  }, value);
}

export function setAtPath(value: JsonValue, path: Array<string | number>, nextValue: JsonValue): JsonValue {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...tail] = path;

  if (Array.isArray(value)) {
    return value.map((item, index) =>
      index === head ? setAtPath(item, tail, nextValue) : item,
    );
  }

  if (value && typeof value === "object") {
    return {
      ...(value as JsonObject),
      [head]: setAtPath((value as JsonObject)[head as string], tail, nextValue),
    };
  }

  return value;
}

export function reorderAtPath(value: JsonValue, path: Array<string | number>, from: number, to: number): JsonValue {
  const target = getAtPath(value, path);

  if (!Array.isArray(target) || from === to) {
    return value;
  }

  const nextArray = [...target];
  const [moved] = nextArray.splice(from, 1);
  nextArray.splice(to, 0, moved);

  return setAtPath(value, path, nextArray as JsonValue);
}

export function cloneTemplate(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return [];
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as JsonObject).map(([key, item]) => [key, cloneTemplate(item)]),
    );
  }

  if (typeof value === "number") {
    return 0;
  }

  if (typeof value === "boolean") {
    return false;
  }

  return "";
}

export function isPlainObject(value: JsonValue): value is JsonObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export function itemTitle(value: JsonValue, fallback: string) {
  if (isPlainObject(value)) {
    const title = value.question ?? value.title ?? value.label ?? value.name ?? value.city ?? value.value ?? value.slug;
    return typeof title === "string" || typeof title === "number" ? String(title) : fallback;
  }

  if (typeof value === "string" && value.trim()) {
    return value.length > 54 ? `${value.slice(0, 54)}...` : value;
  }

  return fallback;
}


export function countEditableFields(value: JsonValue): number {
  if (Array.isArray(value)) {
    return value.reduce<number>((total, item) => total + countEditableFields(item), 0);
  }

  if (isPlainObject(value)) {
    return Object.values(value).reduce<number>((total, item) => total + countEditableFields(item), 0);
  }

  return value === null ? 0 : 1;
}

export function sectionMeta(value: JsonValue | null, language: Language) {
  if (!value) {
    return language === "ar" ? "جار التحميل" : "Loading";
  }

  if (Array.isArray(value)) {
    return language === "ar" ? `${value.length} عنصر` : `${value.length} items`;
  }

  if (isPlainObject(value)) {
    const fieldCount = countEditableFields(value);
    return language === "ar" ? `${fieldCount} حقل قابل للتعديل` : `${fieldCount} editable fields`;
  }

  return language === "ar" ? "حقل واحد قابل للتعديل" : "1 editable field";
}

export function statusLabel(status: string, language: Language) {
  const labels: Record<string, Record<Language, string>> = {
    loading: {
      ar: "جار تحميل المحتوى...",
      en: "Loading content...",
    },
    ready: {
      ar: "جاهز للتعديل",
      en: "Ready to edit",
    },
    loadError: {
      ar: "تعذر تحميل المحتوى.",
      en: "Could not load content.",
    },
    dirty: {
      ar: "توجد تغييرات غير محفوظة",
      en: "Unsaved changes",
    },
    saving: {
      ar: "جار حفظ التغييرات...",
      en: "Saving changes...",
    },
    saved: {
      ar: "تم الحفظ. الصفحات العامة تتحدث تلقائيا.",
      en: "Saved. Public pages update automatically.",
    },
    saveError: {
      ar: "فشل الحفظ. يرجى المحاولة مرة أخرى.",
      en: "Save failed. Please try again.",
    },
  };

  return labels[status]?.[language] ?? status;
}

