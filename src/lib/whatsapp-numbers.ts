// Group WhatsApp numbers (international format, digits only).
// PRIMARY: 9200 19474, the unified Swiss Blue number, WhatsApp line since 15 Nov 2026 (Chatwoot inbox 4, menu bot).
// STANDBY: +966 50 707 4949, the previous main line; still connected to Chatwoot (inbox "4949 (backup)"). Not used anywhere.
// (+966 12 679 0008 is no longer the company's number since 15 Nov 2026: never link to it.)
export const WHATSAPP_PRIMARY_NUMBER = "966920019474";
export const WHATSAPP_STANDBY_NUMBER = "966507074949";

/** Number used by every WhatsApp button; NEXT_PUBLIC_WHATSAPP_NUMBER can override it without a code change. */
export function whatsappNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  return raw && raw.length >= 9 ? raw : WHATSAPP_PRIMARY_NUMBER;
}
