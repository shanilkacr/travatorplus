/** Strip common SVG XSS vectors before rendering untrusted markup. */
export function sanitizeSvgMarkup(svg: string): string {
  let out = svg.trim();

  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
  out = out.replace(/\son\w+\s*=\s*(".*?"|'.*?'|\S+)/gi, "");
  out = out.replace(
    /(?:href|xlink:href)\s*=\s*("|')\s*javascript:[^"']*\1/gi,
    ""
  );
  out = out.replace(/javascript:/gi, "");

  if (!/^<svg[\s>]/i.test(out)) {
    return "";
  }

  return out;
}
