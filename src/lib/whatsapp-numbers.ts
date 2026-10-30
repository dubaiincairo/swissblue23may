// Group WhatsApp numbers (international format, digits only).
// PRIMARY: +966 50 707 4949, the main Swiss Blue WhatsApp line (Chatwoot team inbox), live again since 29 Oct 2026.
// STANDBY: +966 12 679 0008, the KSA line that stood in while 4949 was down; still connected to Chatwoot. Not used anywhere.
export const WHATSAPP_PRIMARY_NUMBER = "966507074949";
export const WHATSAPP_STANDBY_NUMBER = "966126790008";

/** Number used by every WhatsApp button; NEXT_PUBLIC_WHATSAPP_NUMBER can override it without a code change. */
export function whatsappNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  return raw && raw.length >= 9 ? raw : WHATSAPP_PRIMARY_NUMBER;
}
