export function hexToRgba(hex: string, alpha = 1): string {
  let parsed = hex.replace("#", "");
  if (parsed.length === 3) {
    parsed = parsed
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
