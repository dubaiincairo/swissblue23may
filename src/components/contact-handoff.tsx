type SearchValue = string | string[] | undefined;

export default function ContactHandoff({
  locale,
  source,
  message,
}: {
  locale: "ar" | "en";
  source?: SearchValue;
  message?: SearchValue;
}) {
  const sourceValue = Array.isArray(source) ? source[0] : source;
  const messageValue = Array.isArray(message) ? message[0] : message;

  if (sourceValue !== "swissblue-concierge" || !messageValue) {
    return null;
  }

  const decodedMessage = safelyDecode(messageValue);
  const isArabic = locale === "ar";

  return (
    <article className="handoff-card">
      <span className="eyebrow">
        {isArabic ? "طلب محول من SwissBlue Concierge" : "SwissBlue Concierge handoff"}
      </span>
      <h2>{isArabic ? "تفاصيل طلب سما جاهزة لفريق خدمة العملاء." : "Sama prepared this request for the service team."}</h2>
      <pre>{decodedMessage}</pre>
      <p>
        {isArabic
          ? "يمكن لفريق الحجوزات أو الشركات استخدام هذه التفاصيل للمتابعة مع الضيف بسرعة."
          : "Reservations or corporate support can use these details to continue the conversation with the guest."}
      </p>
    </article>
  );
}

function safelyDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
