// Shared keys for cookie-consent coordination between the cookie banner and any
// consent-gated website widgets (e.g. the optional AI assistant). Keeping
// them in one place stops the storage key from drifting between the producer
// (the banner) and the consumers (the widgets).

// Bump this version to re-show the banner to everyone (e.g. after a policy change).
export const CONSENT_STORAGE_KEY = "sb-cookie-consent-v2";

// Dispatched on `window` the moment the visitor accepts or declines, so gated
// widgets can become available without waiting for a page reload.
export const CONSENT_EVENT = "sb-cookie-consent";
