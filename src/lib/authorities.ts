/**
 * Authority catalog + role presets for the admin panel.
 *
 * Pure data + helpers — no Node, no React, no env access — so this module is
 * safe to import from client components, server components, route handlers, AND
 * the edge proxy (middleware). The stored `authorities[]` on each user is the
 * source of truth for enforcement; `role` is only a label + a UI seeding aid.
 */

export type AuthorityId = "content.en" | "content.ar" | "submissions" | "studio" | "users";

export type Authority = {
  id: AuthorityId;
  label: string;
  description: string;
  group: string;
};

export const AUTHORITIES: Authority[] = [
  {
    id: "content.en",
    label: "Edit English content",
    description: "Open the English content studio and save changes to the English website.",
    group: "Content",
  },
  {
    id: "content.ar",
    label: "Edit Arabic content",
    description: "Open the Arabic content studio and save changes to the Arabic website.",
    group: "Content",
  },
  {
    id: "submissions",
    label: "View form submissions",
    description: "Read career applications and corporate (B2B) requests sent through the site.",
    group: "Operations",
  },
  {
    id: "studio",
    label: "Access Sanity Studio",
    description: "Open the raw Sanity Studio (/studio) for advanced content management.",
    group: "Advanced",
  },
  {
    id: "users",
    label: "Manage users & authorities",
    description: "Create, edit, deactivate, and delete admin users and set what each can do.",
    group: "Advanced",
  },
];

export const ALL_AUTHORITY_IDS: AuthorityId[] = AUTHORITIES.map((a) => a.id);

export type AdminRole = "owner" | "manager" | "editor" | "viewer" | "custom";

export const ROLES: { id: AdminRole; label: string; description: string }[] = [
  { id: "owner", label: "Owner", description: "Full access to everything, including managing users." },
  { id: "manager", label: "Manager", description: "Edit content, view submissions, and access Studio." },
  { id: "editor", label: "Editor", description: "Edit English and Arabic website content only." },
  { id: "viewer", label: "Viewer", description: "View form submissions only." },
  { id: "custom", label: "Custom", description: "Start from nothing and pick authorities individually." },
];

export const ROLE_PRESETS: Record<AdminRole, AuthorityId[]> = {
  owner: [...ALL_AUTHORITY_IDS],
  manager: ["content.en", "content.ar", "submissions", "studio"],
  editor: ["content.en", "content.ar"],
  viewer: ["submissions"],
  custom: [],
};

/** Authorities a role grants by default (used to seed the toggles in the UI). */
export function roleSeed(role: AdminRole): AuthorityId[] {
  return [...(ROLE_PRESETS[role] ?? [])];
}

export function isAdminRole(value: unknown): value is AdminRole {
  return typeof value === "string" && value in ROLE_PRESETS;
}

export function hasAuthority(perms: readonly string[] | null | undefined, id: AuthorityId): boolean {
  return Array.isArray(perms) && perms.includes(id);
}

const CONTENT_AUTHORITIES: AuthorityId[] = ["content.en", "content.ar"];

/** The content API saves the whole {ar,en} tree, so any content authority unlocks it. */
export function hasAnyContentAuthority(perms: readonly string[] | null | undefined): boolean {
  return Array.isArray(perms) && CONTENT_AUTHORITIES.some((id) => perms.includes(id));
}

/** Keep only known authority ids, in catalog order (stable, de-duplicated). */
export function sanitizeAuthorities(input: unknown): AuthorityId[] {
  if (!Array.isArray(input)) return [];
  const wanted = new Set(input.filter((v): v is string => typeof v === "string"));
  return ALL_AUTHORITY_IDS.filter((id) => wanted.has(id));
}

/** Admin areas in priority order — the first one a user can reach is their landing page. */
export const AREA_PATHS: { authority: AuthorityId; path: string }[] = [
  { authority: "content.en", path: "/secretpanel" },
  { authority: "content.ar", path: "/secretpanel/ar" },
  { authority: "submissions", path: "/secretpanel/submissions" },
  { authority: "users", path: "/secretpanel/users" },
  { authority: "studio", path: "/studio" },
];

/** First admin area the given authorities can access, or null if none. */
export function firstAllowedPath(perms: readonly string[] | null | undefined): string | null {
  for (const area of AREA_PATHS) {
    if (hasAuthority(perms, area.authority)) return area.path;
  }
  return null;
}
