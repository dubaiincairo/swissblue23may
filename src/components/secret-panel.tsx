"use client";

import { useEffect, useMemo, useState } from "react";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };
type Language = "ar" | "en";
type StatusTone = "ready" | "dirty" | "saving" | "error";

type AdminSection = {
  id: string;
  group: string;
  label: string;
  description: string;
  path: string[];
};

const languages: Record<Language, { label: string; short: string; previewHref: string }> = {
  en: { label: "English", short: "EN", previewHref: "/en" },
  ar: { label: "العربية", short: "AR", previewHref: "/" },
};

const adminSections: AdminSection[] = [
  {
    id: "navGroups",
    group: "Website structure",
    label: "Navigation",
    description: "Main menu groups, dropdown labels, and page links.",
    path: ["navGroups"],
  },
  {
    id: "hero",
    group: "Homepage",
    label: "Hero & booking",
    description: "Main banner headline, supporting copy, and primary actions.",
    path: ["homepage", "hero"],
  },
  {
    id: "highlights",
    group: "Homepage",
    label: "Key numbers",
    description: "The four statistics displayed under the hero section.",
    path: ["homepage", "highlights"],
  },
  {
    id: "properties",
    group: "Homepage",
    label: "Property cards",
    description: "The six hospitality property cards shown on the homepage.",
    path: ["homepage", "properties"],
  },
  {
    id: "loyalty",
    group: "Homepage",
    label: "Loyalty program",
    description: "Program headline, intro text, and guest benefits.",
    path: ["homepage", "loyalty"],
  },
  {
    id: "destinations",
    group: "Homepage",
    label: "Destinations",
    description: "Jeddah, Riyadh, and Jazan cards and city guidance.",
    path: ["homepage", "destinations"],
  },
  {
    id: "offers",
    group: "Homepage",
    label: "Offers",
    description: "Business, family, and monthly-stay offer blocks.",
    path: ["homepage", "offers"],
  },
  {
    id: "services",
    group: "Homepage",
    label: "Services",
    description: "Service section text and amenity list.",
    path: ["homepage", "services"],
  },
  {
    id: "categories",
    group: "Homepage",
    label: "Stay categories",
    description: "Hotel, apart-hotel, and serviced-apartment comparison.",
    path: ["homepage", "categories"],
  },
  {
    id: "cta",
    group: "Homepage",
    label: "Closing CTA",
    description: "Final booking call-to-action at the bottom of the page.",
    path: ["homepage", "cta"],
  },
  {
    id: "footerSections",
    group: "Footer",
    label: "Footer links",
    description: "Footer columns and supporting site links.",
    path: ["footerSections"],
  },
  {
    id: "footerContact",
    group: "Footer",
    label: "Footer support",
    description: "Support bullets shown beside the footer booking action.",
    path: ["footerContact"],
  },
];

const fieldLabels: Record<string, string> = {
  amenities: "Amenities",
  benefits: "Benefits",
  button: "Button label",
  city: "City",
  count: "Count",
  cta: "Button label",
  description: "Description",
  destination: "Destination label",
  eyebrow: "Small heading",
  gallery: "Gallery images",
  hero: "Main banner",
  href: "Link URL",
  howToEnjoy: "How to enjoy",
  image: "Image URL",
  items: "Cards",
  label: "Label",
  landmarks: "Nearby landmarks",
  links: "Links",
  locationHighlight: "Location highlight",
  primaryCta: "Primary button",
  positioning: "Positioning paragraph",
  secondaryCta: "Secondary button",
  secondaryHref: "Secondary button URL",
  slug: "Page slug",
  source: "Source URL",
  summary: "Short summary",
  text: "Body text",
  title: "Title",
  type: "Type",
  unitTypes: "Unit types",
  units: "Unit count",
  value: "Value",
};

const fieldOrder = [
  "eyebrow",
  "title",
  "text",
  "description",
  "summary",
  "positioning",
  "primaryCta",
  "secondaryCta",
  "secondaryHref",
  "cta",
  "href",
  "button",
  "destination",
  "city",
  "type",
  "units",
  "value",
  "label",
  "slug",
  "image",
  "count",
  "unitTypes",
  "amenities",
  "benefits",
  "locationHighlight",
  "landmarks",
  "gallery",
  "howToEnjoy",
  "links",
  "items",
  "source",
];

function labelFor(key: string) {
  return fieldLabels[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function orderedEntries(object: JsonObject) {
  return Object.entries(object)
    .map(([key, value], index) => ({ key, value, index }))
    .sort((left, right) => {
      const leftOrder = fieldOrder.indexOf(left.key);
      const rightOrder = fieldOrder.indexOf(right.key);
      const leftRank = leftOrder === -1 ? 1000 + left.index : leftOrder;
      const rightRank = rightOrder === -1 ? 1000 + right.index : rightOrder;

      return leftRank - rightRank;
    });
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

function isPlainObject(value: JsonValue): value is JsonObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function itemTitle(value: JsonValue, fallback: string) {
  if (isPlainObject(value)) {
    const title = value.title ?? value.label ?? value.city ?? value.value ?? value.slug;
    return typeof title === "string" || typeof title === "number" ? String(title) : fallback;
  }

  if (typeof value === "string" && value.trim()) {
    return value.length > 54 ? `${value.slice(0, 54)}...` : value;
  }

  return fallback;
}

function isLongField(name: string, value: string) {
  return (
    value.length > 86 ||
    ["description", "locationHighlight", "positioning", "summary", "text"].includes(name)
  );
}

function countEditableFields(value: JsonValue): number {
  if (Array.isArray(value)) {
    return value.reduce<number>((total, item) => total + countEditableFields(item), 0);
  }

  if (isPlainObject(value)) {
    return Object.values(value).reduce<number>((total, item) => total + countEditableFields(item), 0);
  }

  return value === null ? 0 : 1;
}

function sectionMeta(value: JsonValue | null) {
  if (!value) {
    return "Loading";
  }

  if (Array.isArray(value)) {
    return `${value.length} items`;
  }

  if (isPlainObject(value)) {
    return `${countEditableFields(value)} editable fields`;
  }

  return "1 editable field";
}

function FieldEditor({
  name,
  value,
  path,
  level = 0,
  onChange,
  onReorder,
}: {
  name: string;
  value: JsonValue;
  path: Array<string | number>;
  level?: number;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  if (typeof value === "string" || typeof value === "number") {
    const stringValue = String(value);
    const inputType = ["href", "image", "secondaryHref", "source"].includes(name) ? "url" : "text";

    return (
      <label className="admin-field">
        <span>{labelFor(name)}</span>
        {isLongField(name, stringValue) ? (
          <textarea
            value={stringValue}
            rows={4}
            onChange={(event) => onChange(path, event.target.value)}
          />
        ) : (
          <input
            type={inputType}
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
    const primitiveList = value.every((item) => !isPlainObject(item) && !Array.isArray(item));

    return (
      <section className="admin-array">
        <div className="admin-array-head">
          <div>
            <h4>{labelFor(name)}</h4>
            <p>{value.length} items. Drag cards to reorder.</p>
          </div>
          <button type="button" onClick={() => onChange(path, [...value, cloneTemplate(value[0] ?? "")])}>
            Add item
          </button>
        </div>

        <div className={primitiveList ? "admin-list-editor" : "admin-array-list"}>
          {value.map((item, index) => {
            const fallback = `${labelFor(name)} ${index + 1}`;

            if (primitiveList) {
              return (
                <div
                  className="admin-list-row"
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
                  <span className="admin-drag-handle" aria-label="Drag item">
                    ::
                  </span>
                  <FieldEditor
                    name={name}
                    value={item}
                    path={[...path, index]}
                    onChange={onChange}
                    onReorder={onReorder}
                  />
                  <button
                    className="admin-remove"
                    type="button"
                    onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                  >
                    Remove
                  </button>
                </div>
              );
            }

            return (
              <details
                className="admin-array-item"
                draggable
                key={`${path.join(".")}-${index}`}
                open={index === 0 || value.length <= 3}
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (dragIndex !== null) {
                    onReorder(path, dragIndex, index);
                    setDragIndex(null);
                  }
                }}
              >
                <summary className="admin-item-summary">
                  <span className="admin-drag-handle" aria-label="Drag item">
                    ::
                  </span>
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
                    Remove
                  </button>
                </summary>
                <div className="admin-nested">
                  <FieldEditor
                    name={name}
                    value={item}
                    path={[...path, index]}
                    level={level + 1}
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
    return (
      <section className={level === 0 ? "admin-object admin-object-root" : "admin-object"}>
        {level > 0 ? <h3>{labelFor(name)}</h3> : null}
        <div className="admin-field-grid">
          {orderedEntries(value).map(({ key, value: item }) => (
            <FieldEditor
              key={`${path.join(".")}-${key}`}
              name={key}
              value={item}
              path={[...path, key]}
              level={level + 1}
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
  const [language, setLanguage] = useState<Language>("en");
  const [selectedId, setSelectedId] = useState("hero");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Loading content...");
  const [statusTone, setStatusTone] = useState<StatusTone>("ready");

  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content);
        setStatus("Ready to edit");
        setStatusTone("ready");
      })
      .catch(() => {
        setStatus("Could not load content.");
        setStatusTone("error");
      });
  }, []);

  const selectedSection = adminSections.find((section) => section.id === selectedId) ?? adminSections[0];
  const activePath = [language, ...selectedSection.path];
  const sectionValue = content ? getAtPath(content, activePath) : null;

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return adminSections;
    }

    return adminSections.filter((section) =>
      `${section.group} ${section.label} ${section.description}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  const groupedSections = useMemo(() => {
    return filteredSections.reduce<Record<string, AdminSection[]>>((groups, section) => {
      groups[section.group] = [...(groups[section.group] ?? []), section];
      return groups;
    }, {});
  }, [filteredSections]);

  function updateValue(path: Array<string | number>, value: JsonValue) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return setAtPath(current, path, value) as JsonObject;
    });
    setStatus("Unsaved changes");
    setStatusTone("dirty");
  }

  function reorderValue(path: Array<string | number>, from: number, to: number) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return reorderAtPath(current, path, from, to) as JsonObject;
    });
    setStatus("Unsaved changes");
    setStatusTone("dirty");
  }

  async function save() {
    if (!content || statusTone === "saving") {
      return;
    }

    setStatus("Saving changes...");
    setStatusTone("saving");

    try {
      const response = await fetch("/api/site-content", {
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Save failed.");
      }

      setContent(data.content);
      setStatus("Saved. Public pages update automatically.");
      setStatusTone("ready");
    } catch {
      setStatus("Save failed. Please try again.");
      setStatusTone("error");
    }
  }

  return (
    <main className="admin-shell" dir="ltr">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">SB</span>
          <div>
            <p>Swiss Blue CMS</p>
            <h1>Content Studio</h1>
          </div>
        </div>

        <div className="admin-language" aria-label="Content language">
          {(Object.keys(languages) as Language[]).map((item) => (
            <button
              className={language === item ? "active" : ""}
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
            >
              <span>{languages[item].short}</span>
              {languages[item].label}
            </button>
          ))}
        </div>

        <label className="admin-search">
          <span>Search sections</span>
          <input
            type="search"
            value={query}
            placeholder="Find homepage, footer, offers..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <nav className="admin-section-list" aria-label="CMS sections">
          {Object.entries(groupedSections).map(([group, sections]) => (
            <div className="admin-nav-group" key={group}>
              <p>{group}</p>
              {sections.map((section) => (
                <button
                  className={selectedSection.id === section.id ? "active" : ""}
                  key={section.id}
                  type="button"
                  onClick={() => setSelectedId(section.id)}
                >
                  <span>{section.label}</span>
                  <small>{section.description}</small>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">
              {selectedSection.group} / {languages[language].label}
            </p>
            <h2>{selectedSection.label}</h2>
            <p>{selectedSection.description}</p>
          </div>

          <div className="admin-actions">
            <span className={`admin-status ${statusTone}`}>{status}</span>
            <a className="admin-preview" href={languages[language].previewHref} target="_blank" rel="noreferrer">
              Preview site
            </a>
            <button className="admin-save" type="button" onClick={save}>
              Save changes
            </button>
          </div>
        </header>

        <div className="admin-editor-grid">
          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <p className="admin-kicker">{languages[language].short} content</p>
                <h3>{selectedSection.label}</h3>
              </div>
              <span>{sectionMeta(sectionValue)}</span>
            </div>

            {sectionValue ? (
              <FieldEditor
                name={selectedSection.id}
                value={sectionValue}
                path={activePath}
                onChange={updateValue}
                onReorder={reorderValue}
              />
            ) : (
              <div className="content-card">Loading editor...</div>
            )}
          </section>

          <aside className="admin-help">
            <p className="admin-kicker">Editing guide</p>
            <h3>Workflow</h3>
            <ul>
              <li>Select the language first.</li>
              <li>Choose a section from the sidebar.</li>
              <li>Drag repeated cards to reorder them.</li>
              <li>Save once you finish a group of edits.</li>
            </ul>
            <div>
              <strong>Live update</strong>
              <p>Saved content is stored in the CMS backend and public pages refresh without redeploy.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
