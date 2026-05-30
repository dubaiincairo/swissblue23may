type Locale = "ar" | "en";

function VisaMark() {
  return (
    <span className="pm-wordmark pm-visa" aria-hidden="true">
      VISA
    </span>
  );
}

function MastercardMark() {
  return (
    <svg
      className="pm-svg"
      viewBox="0 0 36 22"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="14" cy="11" r="9" fill="#EB001B" />
      <circle cx="22" cy="11" r="9" fill="#F79E1B" />
      <path
        d="M18 3.8a9 9 0 0 1 0 14.4 9 9 0 0 1 0-14.4Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function AmexMark() {
  return (
    <span className="pm-wordmark pm-amex" aria-hidden="true">
      AMEX
    </span>
  );
}

function MadaMark() {
  return (
    <span className="pm-wordmark pm-mada" aria-hidden="true">
      ma<span className="pm-mada-accent">da</span>
    </span>
  );
}

function TabbyMark() {
  return (
    <span className="pm-wordmark pm-tabby" aria-hidden="true">
      tabby
    </span>
  );
}

const METHODS = [
  { name: "Visa", Mark: VisaMark },
  { name: "Mastercard", Mark: MastercardMark },
  { name: "American Express", Mark: AmexMark },
  { name: "Mada", Mark: MadaMark },
  { name: "Tabby", Mark: TabbyMark },
];

export default function PaymentMethods({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div className="footer-payments" dir={locale === "ar" ? "rtl" : "ltr"}>
      <span className="footer-payments-label">{label}</span>
      <ul className="footer-payments-list" aria-label={label}>
        {METHODS.map(({ name, Mark }) => (
          <li key={name} className="payment-chip" role="img" aria-label={name} title={name}>
            <Mark />
          </li>
        ))}
      </ul>
    </div>
  );
}
