import type { ReactNode } from "react";
import Image from "next/image";

type AdminAuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const destinationPhotos = [
  {
    city: "Jeddah",
    image: "https://images.unsplash.com/photo-1707449908429-e0189297d671?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "Riyadh",
    image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "AlUla",
    image: "https://images.unsplash.com/photo-1590959914819-b767b9fe4cfb?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "Abha",
    image: "https://images.unsplash.com/photo-1660841699513-bd3d3322c17f?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "Dammam",
    image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "Madinah",
    image: "https://images.unsplash.com/photo-1572358899655-f63ece97bfa5?auto=format&fit=crop&w=900&q=82",
  },
];

export default function AdminAuthShell({ title, description, children }: AdminAuthShellProps) {
  return (
    <main className="admin-auth-shell" dir="ltr">
      <div className="admin-auth-mosaic" aria-hidden="true">
        {destinationPhotos.map((photo) => (
          <span
            className="admin-auth-photo"
            key={photo.city}
            style={{ backgroundImage: `url(${photo.image})` }}
          />
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
