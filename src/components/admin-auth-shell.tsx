import type { ReactNode } from "react";
import Image from "next/image";

type AdminAuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const destinationPhotos = [
  {
    category: "Red Sea coast",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/King_Fahd%E2%80%99s_Fountain.jpg/1280px-King_Fahd%E2%80%99s_Fountain.jpg",
    position: "center 72%",
  },
  {
    category: "Riyadh skyline",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Riyadh_Skyline.jpg/1280px-Riyadh_Skyline.jpg",
    position: "center center",
  },
  {
    category: "Hegra heritage",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Hegra%2C_Al-Ula%2C_Saudi_Arabia.png/1280px-Hegra%2C_Al-Ula%2C_Saudi_Arabia.png",
    position: "66% center",
  },
  {
    category: "Asir highlands",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sarawat_Mountains%2C_Asir_Region%2C_Saudi_Arabia_%282%29.jpg/1280px-Sarawat_Mountains%2C_Asir_Region%2C_Saudi_Arabia_%282%29.jpg",
    position: "center 72%",
  },
  {
    category: "Empty Quarter reserve",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Uruq_Bani_Ma%27arid_Reserve%2C_Saudi_Arabia_%282025%29.jpg/1280px-Uruq_Bani_Ma%27arid_Reserve%2C_Saudi_Arabia_%282025%29.jpg",
    position: "center center",
  },
  {
    category: "Historic Jeddah",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Old_Jeddah_%28Al_Balad%29%2C_Saudi_Arabia_in_November_2022.jpg/1280px-Old_Jeddah_%28Al_Balad%29%2C_Saudi_Arabia_in_November_2022.jpg",
    position: "center center",
  },
];

export default function AdminAuthShell({ title, description, children }: AdminAuthShellProps) {
  return (
    <main className="admin-auth-shell" dir="ltr">
      <div className="admin-auth-mosaic" aria-hidden="true">
        {destinationPhotos.map((photo) => (
          <span className="admin-auth-photo" key={photo.category}>
            <Image
              alt=""
              fill
              sizes="(max-width: 700px) 50vw, 34vw"
              src={photo.image}
              style={{ objectFit: "cover", objectPosition: photo.position }}
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
