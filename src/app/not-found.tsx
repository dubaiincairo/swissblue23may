import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Home } from "lucide-react";
import { headers } from "next/headers";
import { getEditableContent, usableLogo } from "@/lib/editable-content";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const requestHeaders = await headers();
  const isArabic = requestHeaders.get("x-locale") === "ar";
  const { ar, en } = await getEditableContent();
  const content = isArabic ? ar : en;
  const slides = content.media.mainHeroSlides ?? [];
  const background =
    slides.find((slide) => slide.kind !== "video" && slide.source)?.source ||
    content.media.mainHero;
  const logo = isArabic
    ? usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo)
    : usableLogo(en.media.logo) || usableLogo(ar.media.arabicLogo);
  const homeHref = isArabic ? "/ar" : "/en";
  const hotelsHref = isArabic ? "/ar/hotels" : "/en/hotels";
  const DirectionArrow = isArabic ? ArrowRight : ArrowLeft;

  return (
    <main className={styles.page} dir={isArabic ? "rtl" : "ltr"}>
      {background ? (
        <Image
          className={styles.background}
          src={background}
          alt=""
          fill
          priority
          sizes="100vw"
        />
      ) : null}
      <div className={styles.overlay} aria-hidden="true" />

      <header className={styles.header}>
        <Link href={homeHref} aria-label={isArabic ? "الرئيسية لفنادق سويس بلو" : "Swiss Blue Hotels home"}>
          {logo ? (
            <Image
              className={styles.logo}
              src={logo}
              alt={isArabic ? "فنادق سويس بلو" : "Swiss Blue Hotels"}
              width={220}
              height={92}
              priority
            />
          ) : (
            <span>Swiss Blue</span>
          )}
        </Link>
      </header>

      <section className={styles.content} aria-labelledby="not-found-title">
        <span className={styles.code} aria-hidden="true">404</span>
        <p className={styles.eyebrow}>
          {isArabic ? "يبدو أن هذه الوجهة غير متاحة" : "This destination is not available"}
        </p>
        <h1 id="not-found-title">
          {isArabic ? "لنُعِدك إلى المسار الصحيح." : "Let’s get you back on the right route."}
        </h1>
        <p>
          {isArabic
            ? "ربما تم نقل الصفحة أو لم يعد الرابط صالحاً. يمكنك العودة إلى الرئيسية أو استكشاف منشآت سويس بلو المتاحة."
            : "The page may have moved or the link may no longer be valid. Return home or explore available Swiss Blue properties."}
        </p>
        <div className={styles.actions}>
          <Link className={`btn btn-primary ${styles.action}`} href={homeHref}>
            <Home aria-hidden="true" size={18} strokeWidth={2.2} />
            {isArabic ? "العودة إلى الرئيسية" : "Return home"}
          </Link>
          <Link className={`btn ${styles.action} ${styles.secondary}`} href={hotelsHref}>
            <Building2 aria-hidden="true" size={18} strokeWidth={2.2} />
            {isArabic ? "استكشف الفنادق" : "Explore properties"}
          </Link>
        </div>
        <Link className={styles.backLink} href={homeHref}>
          <DirectionArrow aria-hidden="true" size={17} strokeWidth={2.2} />
          {isArabic ? "العودة إلى سويس بلو" : "Back to Swiss Blue"}
        </Link>
      </section>

      <p className={styles.brandNote}>
        {isArabic ? "فنادق سويس بلو" : "Swiss Blue Hotels"}
      </p>
    </main>
  );
}
