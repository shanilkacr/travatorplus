export type CookieConsentChoice = "accepted" | "rejected";

const STORAGE_KEY = "travator_cookie_consent";

export function getCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "rejected") return value;
    return null;
  } catch {
    return null;
  }
}

export function setCookieConsent(choice: CookieConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
    localStorage.setItem(`${STORAGE_KEY}_at`, new Date().toISOString());
  } catch {
    // Storage may be blocked in private browsing — banner stays dismissible.
  }
}
