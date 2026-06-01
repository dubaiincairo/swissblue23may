// Shared types for the Swiss Blue admin panel.

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };
export type Language = "ar" | "en";
export type StatusTone = "ready" | "dirty" | "saving" | "error";

export type AdminSection = {
  id: string;
  group: string;
  label: string;
  description: string;
  path: string[];
};

export type AdminSectionTranslation = {
  group: string;
  label: string;
  description: string;
};

