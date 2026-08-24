export interface B2bLeadInput {
  company: string;
  contact: string;
  email: string;
  phone: string;
  requestType: string;
  message?: string;
  locale: "ar" | "en";
}

export async function submitB2bLead(input: B2bLeadInput): Promise<void> {
  const response = await fetch("/api/forms/b2b", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (response.ok) return;

  let message = "Unable to submit the request.";
  try {
    const payload = (await response.json()) as { error?: unknown };
    if (typeof payload.error === "string") message = payload.error;
  } catch {
    // Keep the safe fallback when the server did not return JSON.
  }
  throw new Error(message);
}
