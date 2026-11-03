import { notFound } from "next/navigation";

// Unknown URLs under /en render the English 404 (the global 404 is Arabic-first).
export function generateStaticParams() {
  return [];
}

export default function MissingEnglishPage() {
  notFound();
}
