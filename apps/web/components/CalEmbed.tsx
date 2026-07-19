const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CAL_COM_URL ?? "https://calendly.com/shanilka/30min";

function embedUrl(base: string) {
  const url = new URL(base);
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("background_color", "ffffff");
  url.searchParams.set("text_color", "0a0a0a");
  url.searchParams.set("primary_color", "0a0a0a");
  return url.toString();
}

export function CalEmbed() {
  return (
    <iframe
      src={embedUrl(CALENDLY_URL)}
      title="Book a call with the founder"
      className="h-[640px] w-full rounded-4xl shadow-soft"
      loading="lazy"
    />
  );
}
