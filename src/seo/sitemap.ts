/**
 * Sitemap Generation
 * Creates XML sitemap for search engines
 */

import { seoConfig, getFullUrl } from "./config";

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

/**
 * Get current date in ISO format (YYYY-MM-DD)
 */
function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Generate sitemap XML
 */
export function generateSitemap(urls: SitemapUrl[] = []): string {
  // Default URLs if none provided
  const defaultUrls: SitemapUrl[] = [
    {
      loc: getFullUrl("/Trigger%20Food%20Navigator"),
      lastmod: getCurrentDate(),
      changefreq: "weekly",
      priority: 1.0
    }
  ];

  const allUrls = urls.length > 0 ? urls : defaultUrls;

  const urlEntries = allUrls
    .map((url) => {
      const loc = `<loc>${escapeXml(url.loc)}</loc>`;
      const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : "";
      const changefreq = url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : "";
      const priority = url.priority !== undefined ? `<priority>${url.priority}</priority>` : "";

      return `  <url>
    ${loc}
${lastmod ? `    ${lastmod}\n` : ""}${changefreq ? `    ${changefreq}\n` : ""}${priority ? `    ${priority}\n` : ""}  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}







