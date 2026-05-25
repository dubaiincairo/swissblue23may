"use client";

import { useEffect, useMemo, useState } from "react";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

const sectionLabels: Record<string, string> = {
  navGroups: "Navigation",
  footerSections: "Footer links",
  footerContact: "Footer support",
  homepage: "Homepage",
  hero: "Main banner",
  highlights: "Stats",
  properties: "Hospitality properties",
  loyalty: "Loyalty program",
  destinations: "Destinations",
  offers: "Offers",
  services: "Services",
  categories: "Stay categories",
  cta: "Closing CTA",
};

function labelFor(key: string) {
  return sectionLabels[key] ?? key.replace(/([A-Z])/g, " $1");
}

function setAtPath(value: JsonValue, path: Array<string | number>, nextValue: JsonValue): JsonValue {
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

function reorderAtPath(value: JsonValue, path: Array<string | number>, from: number, to: number): JsonValue {
  const target = getAtPath(value, path);

  if (!Array.isArray(target) || from === to) {
    return value;
  }

  const nextArray = [...target];
  const [moved] = nextArray.splice(from, 1);
  nextArray.splice(to, 0, moved);

  return setAtPath(value, path, nextArray as JsonValue);
}

function getAtPath(value: JsonValue, path: Array<string | number>): JsonValue {
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

function cloneTemplate(value: JsonValue): JsonValue {
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

function FieldEditor({
  name,
  value,
  path,
  onChange,
  onReorder,
}: {
  name: string;
  value: JsonValue;
  path: Array<string | number>;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  if (typeof value === "string" || typeof value === "number") {
    const stringValue = String(value);
    const isLong = stringValue.length > 72 || ["text", "description", "summary", "positioning"].includes(name);

    return (
      <label className="admin-field">
        <span>{labelFor(name)}</span>
        {isLong ? (
          <textarea
            value={stringValue}
            rows={4}
            onChange={(event) => onChange(path, event.target.value)}
          />
        ) : (
          <input
            value={stringValue}
            onChange={(event) =>
              onChange(path, typeof value === "number" ? Number(event.target.value) : event.target.value)
            }
          />
        )}
      </label>
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
        <span>{labelFor(name)}</span>
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <section className="admin-array">
        <div className="admin-array-head">
          <h4>{labelFor(name)}</h4>
          <button
            type="button"
            onClick={() => onChange(path, [...value, cloneTemplate(value[0] ?? "")])}
          >
            Add
          </button>
        </div>
        <div className="admin-array-list">
          {value.map((item, index) => (
            <article
              className="admin-array-item"
              draggable
              key={`${path.join(".")}-${index}`}
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex !== null) {
                  onReorder(path, dragIndex, index);
                  setDragIndex(null);
                }
              }}
            >
              <div className="admin-drag-row">
                <span className="admin-drag-handle">Drag</span>
                <strong>{`${labelFor(name)} ${index + 1}`}</strong>
                <button
                  type="button"
                  onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                >
                  Remove
                </button>
              </div>
              <FieldEditor
                name={`${name} item`}
                value={item}
                path={[...path, index]}
                onChange={onChange}
                onReorder={onReorder}
              />
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (value && typeof value === "object") {
    return (
      <section className="admin-group">
        <h3>{labelFor(name)}</h3>
        <div className="admin-group-grid">
          {Object.entries(value as JsonObject).map(([key, item]) => (
            <FieldEditor
              key={`${path.join(".")}-${key}`}
              name={key}
              value={item}
              path={[...path, key]}
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

export default function SecretPanel() {
  const [content, setContent] = useState<JsonObject | null>(null);
  const [language, setLanguage] = useState<"ar" | "en">("en");
  const [section, setSection] = useState("homepage");
  const [status, setStatus] = useState("Loading content...");

  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content);
        setStatus("Ready");
      })
      .catch(() => setStatus("Could not load content."));
  }, []);

  const sectionValue = useMemo(() => {
    if (!content) {
      return null;
    }

    return ((content[language] as JsonObject)?.[section] ?? null) as JsonValue | null;
  }, [content, language, section]);

  function updateValue(path: Array<string | number>, value: JsonValue) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return setAtPath(current, [language, section, ...path], value) as JsonObject;
    });
    setStatus("Unsaved changes");
  }

  function reorderValue(path: Array<string | number>, from: number, to: number) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return reorderAtPath(current, [language, section, ...path], from, to) as JsonObject;
    });
    setStatus("Unsaved changes");
  }

  async function save() {
    if (!content) {
      return;
    }

    setStatus("Saving...");
    const response = await fetch("/api/site-content", {
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });

    setStatus(response.ok ? "Saved. Public pages will update automatically." : "Save failed.");
  }

  return (
    <main className="admin-shell" dir="ltr">
      <aside className="admin-sidebar">
        <div>
          <p className="admin-kicker">Swiss Blue CMS</p>
          <h1>Secret Panel</h1>
          <p>Edit live website content without a redeploy.</p>
        </div>

        <div className="admin-language">
          <button
            className={language === "en" ? "active" : ""}
            type="button"
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <button
            className={language === "ar" ? "active" : ""}
            type="button"
            onClick={() => setLanguage("ar")}
          >
            العربية
          </button>
        </div>

        <nav className="admin-section-list">
          {["navGroups", "footerSections", "footerContact", "homepage"].map((item) => (
            <button
              className={section === item ? "active" : ""}
              key={item}
              type="button"
              onClick={() => setSection(item)}
            >
              {labelFor(item)}
            </button>
          ))}
        </nav>

        <button className="admin-save" type="button" onClick={save}>
          Save changes
        </button>
        <p className="admin-status">{status}</p>
      </aside>

      <section className="admin-editor">
        <div className="admin-editor-head">
          <div>
            <p className="admin-kicker">{language.toUpperCase()}</p>
            <h2>{labelFor(section)}</h2>
          </div>
          <p>Drag repeated cards to reorder them. Every field shown here is connected to the live UI.</p>
        </div>

        {sectionValue ? (
          <FieldEditor
            name={section}
            value={sectionValue}
            path={[]}
            onChange={updateValue}
            onReorder={reorderValue}
          />
        ) : (
          <div className="content-card">Loading editor...</div>
        )}
      </section>
    </main>
  );
}
