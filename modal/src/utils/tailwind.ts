import tailwindStyles from "../assets/main.css?inline";

let sheet: CSSStyleSheet | null = null;

export function getTailwindSheet(): CSSStyleSheet {
  if (sheet === null) {
    sheet = new CSSStyleSheet();
    sheet.replaceSync(tailwindStyles);
  }
  return sheet;
}
