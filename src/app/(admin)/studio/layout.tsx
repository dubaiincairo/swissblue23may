import { requireAuthority } from "@/lib/admin-session";

// Second layer behind the proxy matcher: Studio is a client page, so the
// session and "studio" authority are verified here before it renders.
export default async function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAuthority("studio");
  return children;
}
