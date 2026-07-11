import type { ReactNode } from "react";
import Image from "next/image";
import type { AdminAuthBackdrop } from "@/lib/admin-auth-backdrop";

type AdminAuthShellProps = {
  backdrop: AdminAuthBackdrop;
  title: string;
  description: string;
  children: ReactNode;
};

export default function AdminAuthShell({ backdrop, title, description, children }: AdminAuthShellProps) {
  return (
    <main className="admin-auth-shell" dir="ltr">
      <div className={`admin-auth-mosaic${backdrop.layout === "slices" ? " is-slices" : ""}`} aria-hidden="true">
        {backdrop.photos.map((photo, index) => (
          <span className="admin-auth-photo" key={`${photo.image}-${index}`}>
            <Image
              alt=""
              fill
              sizes={backdrop.layout === "slices" ? "(max-width: 700px) 50vw, 17vw" : "(max-width: 700px) 50vw, 34vw"}
              src={photo.image}
              style={{ objectFit: "cover", objectPosition: photo.focus }}
            />
          </span>
        ))}
      </div>
      <div className="admin-auth-shade" aria-hidden="true" />

      <section className="admin-auth-card" aria-labelledby="admin-auth-title">
        <header className="admin-auth-brand">
          <span className="admin-auth-mark">
            <Image src="/icon.png" alt="Swiss Blue" width={44} height={44} priority />
          </span>
          <div>
            <p>Swiss Blue</p>
            <span>Content Studio</span>
          </div>
        </header>

        <div className="admin-auth-heading">
          <h1 id="admin-auth-title">{title}</h1>
          <p>{description}</p>
        </div>

        {children}

        <p className="admin-auth-footnote">Secure access for authorized Swiss Blue teams.</p>
      </section>
    </main>
  );
}
