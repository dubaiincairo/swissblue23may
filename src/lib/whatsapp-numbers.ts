// Group WhatsApp numbers (international format, digits only).
// PRIMARY: +966 12 679 0008, the unified Swiss Blue WhatsApp line connected to the Chatwoot team inbox.
// STANDBY: +966 50 707 4949, the old main number; kept for when its WhatsApp registration is fixed. Not used anywhere yet.
export const WHATSAPP_PRIMARY_NUMBER = "966126790008";
export const WHATSAPP_STANDBY_NUMBER = "966507074949";

/** Number used by every WhatsApp button; NEXT_PUBLIC_WHATSAPP_NUMBER can override it without a code change. */
export function whatsappNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  return raw && raw.length >= 9 ? raw : WHATSAPP_PRIMARY_NUMBER;
}
