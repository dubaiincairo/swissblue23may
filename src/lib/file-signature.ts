/**
 * Detect a file's true type from its leading "magic" bytes, so uploads can be
 * validated against their actual content rather than the client-supplied
 * Content-Type (which is trivially spoofable).
 *
 * Returns a canonical MIME string, or null when the signature isn't recognised.
 * SVG is intentionally absent — it's XML, not a binary signature, so SVG uploads
 * are validated structurally and sanitised separately (see the upload route).
 */
export function sniffMime(buf: Uint8Array): string | null {
  const at = (i: number) => buf[i];
  const match = (sig: number[], offset = 0) => sig.every((v, i) => at(offset + i) === v);

  // --- Images ---
  if (match([0xff, 0xd8, 0xff])) return "image/jpeg";
  if (match([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (match([0x52, 0x49, 0x46, 0x46]) && match([0x57, 0x45, 0x42, 0x50], 8)) {
    return "image/webp"; // "RIFF"...."WEBP"
  }

  // --- ISO-BMFF (offset 4 = "ftyp"): avif / mp4 / mov, distinguished by brand ---
  if (match([0x66, 0x74, 0x79, 0x70], 4)) {
    const brand = String.fromCharCode(at(8) || 0, at(9) || 0, at(10) || 0, at(11) || 0);
    if (brand.startsWith("avif") || brand.startsWith("avis")) return "image/avif";
    if (brand.startsWith("qt")) return "video/quicktime";
    return "video/mp4"; // isom, mp41, mp42, iso2, M4V, dash, …
  }

  // --- Other video ---
  if (match([0x1a, 0x45, 0xdf, 0xa3])) return "video/webm"; // EBML (webm / mkv)

  // --- Documents ---
  if (match([0x25, 0x50, 0x44, 0x46])) return "application/pdf"; // "%PDF"
  if (match([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return "application/msword"; // OLE2 (.doc)
  if (match([0x50, 0x4b, 0x03, 0x04])) return "application/zip"; // ZIP container (.docx, …)

  return null;
}

/** True when bytes look like a real SVG document (checked before sanitising). */
export function looksLikeSvg(text: string): boolean {
  return text.slice(0, 1000).toLowerCase().includes("<svg");
}
