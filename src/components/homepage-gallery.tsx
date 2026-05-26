import Image from "next/image";

type GalleryImage = {
  readonly image: string;
  readonly title: string;
};

const fallbackGalleryImages = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1500&q=82",
    titleEn: "Resort-style arrival",
    titleAr: "استقبال بروح الضيافة",
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=82",
    titleEn: "City hotel comfort",
    titleAr: "راحة فندقية داخل المدينة",
  },
  {
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=82",
    titleEn: "Quiet rooms and suites",
    titleAr: "غرف وأجنحة هادئة",
  },
  {
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=82",
    titleEn: "Apartment-style stays",
    titleAr: "إقامات بطابع الشقق",
  },
  {
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=82",
    titleEn: "Dining and lounge spaces",
    titleAr: "مساحات طعام واستراحة",
  },
];

export default function HomepageGallery({
  images,
  locale,
}: {
  images?: readonly GalleryImage[];
  locale: "ar" | "en";
}) {
  const isArabic = locale === "ar";
  const galleryImages =
    images?.length
      ? images.map((image) => ({
          image: image.image,
          title: image.title,
        }))
      : fallbackGalleryImages.map((image) => ({
          image: image.image,
          title: isArabic ? image.titleAr : image.titleEn,
        }));

  return (
    <section className="hotel-showcase mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="section-heading">
        <span className="eyebrow">{isArabic ? "معرض الصور" : "Photo gallery"}</span>
        <h2>
          {isArabic
            ? "معرض ضيافة سويس بلو."
            : "Signature Hotel Gallery."}
        </h2>
        <p>
          {isArabic
            ? "صور منتقاة تعكس أجواء الفنادق، الغرف، الشقق، ومساحات الضيافة التي يتوقعها ضيوف سويس بلو."
            : "Selected hospitality scenes that reflect the mood of Swiss Blue hotels, rooms, apartments, and guest spaces."}
        </p>
      </div>

      <div className="hotel-showcase-grid mt-8">
        {galleryImages.map((image, index) => (
          <figure className={index === 0 ? "feature" : ""} key={`${image.image}-${index}`}>
            <Image
              className="object-cover"
              src={image.image}
              alt={image.title}
              fill
              sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
            />
            <figcaption>{image.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
