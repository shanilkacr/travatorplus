/**
 * Cal.com scheduler embed. If NEXT_PUBLIC_CAL_COM_URL is unset, renders a
 * graceful monochrome placeholder instead of a broken iframe.
 */
export function CalEmbed() {
  const url = process.env.NEXT_PUBLIC_CAL_COM_URL;

  if (!url) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
        <p className="eyebrow">Scheduler</p>
        <p className="mt-4 max-w-sm text-sm text-gray-500">
          The live calendar isn't connected in this environment. Set{" "}
          <code className="text-ink">NEXT_PUBLIC_CAL_COM_URL</code> to embed
          Cal.com — or use the form below and we'll reach out.
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title="Book a call"
      className="h-[640px] w-full border border-gray-300"
      loading="lazy"
    />
  );
}
