export function CalEmbed() {
  const url = process.env.NEXT_PUBLIC_CAL_COM_URL;

  if (!url) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-4xl bg-gray-50/80 p-10 text-center shadow-soft">
        <p className="eyebrow">Scheduler</p>
        <p className="mt-4 max-w-sm text-sm text-gray-500">
          The live calendar isn't connected in this environment. Set{" "}
          <code className="text-ink">NEXT_PUBLIC_CAL_COM_URL</code> to embed
          Cal.com — or use the form and we'll reach out.
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title="Book a call"
      className="h-[640px] w-full rounded-4xl shadow-soft"
      loading="lazy"
    />
  );
}
