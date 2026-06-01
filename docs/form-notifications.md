# Form submission notifications (email + WhatsApp)

Both website forms now notify the hotel the moment a submission is saved:

| Form | Endpoint | Email goes to | WhatsApp |
| --- | --- | --- | --- |
| Job applicants (Careers) | `POST /api/forms/careers` | `CAREERS_NOTIFY_TO` (default `careers@swissblue.sa`) — CV attached | yes |
| B2B / corporate requests | `POST /api/forms/b2b` | `B2B_NOTIFY_TO` (default `reservations@swissblue.sa`) | yes |

Implementation:
- `src/lib/notify.ts` — channel senders (`sendEmail`, `sendWhatsAppTemplate`) + per-form builders (`notifyCareerApplication`, `notifyCorporateRequest`). No third-party SDKs; uses `fetch`.
- The route handlers call the notifier via `after()` (Next.js) so it runs **after** the HTTP response — a slow email/WhatsApp never delays the visitor, and a failed notification never fails the submission (it's already in Sanity). Errors are logged server-side.
- Every channel is **opt-in by env var**. Missing credentials → that channel is silently skipped. So nothing breaks before you finish the setup below.

---

## 1. Email — Brevo

1. In Brevo (https://app.brevo.com) → **SMTP & API → API Keys**, create a key → `BREVO_API_KEY` (starts with `xkeysib-`).
2. **Authenticate the `swissblue.sa` domain** (Brevo → Senders, Domains & Dedicated IPs → Domains). This lets you send from any `@swissblue.sa` address.
3. **Disable Authorized IPs** (Brevo → Security → [Authorized IPs](https://app.brevo.com/security/authorised_ips)). ⚠️ Required: Vercel functions send from rotating IPs, so if this restriction is on, the API returns `401 unauthorized` ("unrecognised IP address"). Turn it off (allow all IPs).
4. Set `BREVO_FROM_EMAIL` to a sender on the authenticated domain, e.g. `notifications@swissblue.sa`, and `BREVO_FROM_NAME` (default `Swiss Blue`).
5. (Optional) Change `CAREERS_NOTIFY_TO` / `B2B_NOTIFY_TO` to route each form elsewhere.

Reply-To is set to the applicant/contact's own email, so hitting "Reply" answers them directly. The careers email has the CV attached.

---

## 2. WhatsApp — Meta Cloud API

WhatsApp **business-initiated** messages (which these alerts are) require a **pre-approved template**. Plan ~ a few minutes to a day for template review.

### a. Provision the number
1. https://developers.facebook.com → create an app (type **Business**) → add the **WhatsApp** product.
2. Note the **Phone number ID** → `WHATSAPP_PHONE_NUMBER_ID`. (Meta gives a free test sender that can message up to 5 verified recipients — fine to start.)
3. Create a **permanent access token** via a System User (Business Settings → Users → System users → generate token with `whatsapp_business_messaging`) → `WHATSAPP_ACCESS_TOKEN`. The temporary token in the dashboard expires in 24h — don't use it in production.
4. `WHATSAPP_TO` = the recipient number in **E.164 digits only** (no `+`, spaces, or dashes), e.g. `9665XXXXXXXX`. If using the free test sender, add this number as a verified recipient in the dashboard.

### b. Create the template
In **WhatsApp Manager → Message templates → Create**:
- **Name:** `new_form_submission` (must match `WHATSAPP_TEMPLATE_NAME`)
- **Category:** Utility
- **Language:** English → set `WHATSAPP_TEMPLATE_LANG` to the matching code (`en`, or `en_US` if you pick US English)
- **Body** (copy exactly — 5 variables, in this order):

```
New {{1}} — Swiss Blue Hotel

Name: {{2}}
Email: {{3}}
Phone: {{4}}
Details: {{5}}

Open the admin panel for the full submission.
```

- Provide sample values when prompted, e.g. `Job Application`, `Ahmed Ali`, `ahmed@example.com`, `+966 5X XXX XXXX`, `Front Office Manager`.

The code always sends exactly these 5 body parameters:
`{{1}}` submission type · `{{2}}` name/company · `{{3}}` email · `{{4}}` phone · `{{5}}` short summary.
If you change the number of variables in the template, update `sendWhatsAppTemplate` calls in `src/lib/notify.ts` to match, or Meta will reject the send.

---

## 3. Set the variables in Vercel

`.env.local` is git-ignored, so it only affects local `next dev`. For staging/production add the same keys in **Vercel → Project → Settings → Environment Variables** (Production + Preview):

```
BREVO_API_KEY
BREVO_FROM_EMAIL
BREVO_FROM_NAME
CAREERS_NOTIFY_TO
B2B_NOTIFY_TO
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_ACCESS_TOKEN
WHATSAPP_TO
WHATSAPP_TEMPLATE_NAME
WHATSAPP_TEMPLATE_LANG
WHATSAPP_GRAPH_VERSION   (optional, default v22.0)
```

Redeploy after adding them.

---

## 4. Test

1. Fill in the env vars locally, run `npm run dev`.
2. Submit the **Careers** form (with a small PDF) and the **B2B / corporate** form.
3. Expect: an email at the configured inbox (CV attached for careers) **and** a WhatsApp message at `WHATSAPP_TO`.
4. If a channel is silent, check the server log for `[notify] … skipped` (missing env) or `[notify:…]` (provider error, with the Resend/Meta status + message).
