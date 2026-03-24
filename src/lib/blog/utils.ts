import { SUPPORTED_LOCALES } from "./engine";

export function resolveBlogHref(locale: string, slug?: string): string {
  const base = locale === "en" ? "/blog" : `/${locale}/blog`;
  return slug ? `${base}/${slug}` : base;
}

export function normalizeBlogPath(pathname: string): string {
  if (pathname.endsWith("/") && pathname.length > 1) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function isValidBlogLocale(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(locale);
}
