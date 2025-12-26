/**
 * HTML Injection Utilities
 * Parses HTML and injects SEO meta tags and structured data
 */

import { seoConfig, getCanonicalUrl } from "./config";
import { generateAllStructuredData, structuredDataToScriptTags } from "./structuredData";

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

/**
 * Generate all SEO meta tags
 */
export function generateMetaTags(path: string = "/Trigger%20Food%20Navigator"): MetaTag[] {
  const canonicalUrl = getCanonicalUrl(path);
  const fullImageUrl = seoConfig.ogImage.startsWith("http")
    ? seoConfig.ogImage
    : getCanonicalUrl(seoConfig.ogImage);

  return [
    // Basic meta tags
    { name: "description", content: seoConfig.siteDescription },
    { name: "keywords", content: seoConfig.siteKeywords.join(", ") },
    { name: "author", content: seoConfig.author },
    { name: "robots", content: "index, follow" },
    
    // Open Graph tags
    { property: "og:type", content: "website" },
    { property: "og:title", content: seoConfig.siteName },
    { property: "og:description", content: seoConfig.siteDescription },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: fullImageUrl },
    { property: "og:site_name", content: seoConfig.siteName },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seoConfig.siteName },
    { name: "twitter:description", content: seoConfig.siteDescription },
    { name: "twitter:image", content: fullImageUrl },
    ...(seoConfig.twitterHandle ? [{ name: "twitter:site", content: seoConfig.twitterHandle }] : []),
    
    // Canonical URL
    { name: "canonical", content: canonicalUrl }
  ];
}

/**
 * Convert meta tags to HTML string
 */
export function metaTagsToHTML(tags: MetaTag[]): string {
  return tags
    .map((tag) => {
      if (tag.name) {
        if (tag.name === "canonical") {
          return `<link rel="canonical" href="${escapeHtml(tag.content)}" />`;
        }
        return `<meta name="${escapeHtml(tag.name)}" content="${escapeHtml(tag.content)}" />`;
      }
      if (tag.property) {
        return `<meta property="${escapeHtml(tag.property)}" content="${escapeHtml(tag.content)}" />`;
      }
      return "";
    })
    .filter((tag) => tag.length > 0)
    .join("\n  ");
}

/**
 * Escape HTML special characters
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Inject SEO content into HTML
 */
export function injectSEO(html: string, path: string = "/Trigger%20Food%20Navigator"): string {
  // Generate meta tags and structured data
  const metaTags = generateMetaTags(path);
  const metaTagsHTML = metaTagsToHTML(metaTags);
  const structuredData = generateAllStructuredData();
  const structuredDataHTML = structuredDataToScriptTags(structuredData);

  // Find the head tag
  const headMatch = html.match(/<head[^>]*>/i);
  if (!headMatch) {
    // If no head tag, try to find </head> or add one
    const htmlMatch = html.match(/<html[^>]*>/i);
    if (htmlMatch) {
      const insertIndex = htmlMatch.index! + htmlMatch[0].length;
      return (
        html.slice(0, insertIndex) +
        "\n<head>\n  " +
        metaTagsHTML +
        "\n  " +
        structuredDataHTML +
        "\n</head>" +
        html.slice(insertIndex)
      );
    }
    // Fallback: prepend to body
    const bodyMatch = html.match(/<body[^>]*>/i);
    if (bodyMatch) {
      const insertIndex = bodyMatch.index! + bodyMatch[0].length;
      return (
        html.slice(0, insertIndex) +
        "\n  " +
        metaTagsHTML +
        "\n  " +
        structuredDataHTML +
        html.slice(insertIndex)
      );
    }
    return html;
  }

  const headIndex = headMatch.index! + headMatch[0].length;

  // Check if SEO tags already exist (to avoid duplicates)
  const hasExistingSEO = html.includes('property="og:title"') || html.includes('name="twitter:card"');

  if (hasExistingSEO) {
    // Replace existing meta tags if they exist
    // For simplicity, we'll append new ones (browsers will use the first/last)
    const titleMatch = html.match(/<title[^>]*>.*?<\/title>/i);
    if (titleMatch) {
      const insertIndex = titleMatch.index! + titleMatch[0].length;
      return (
        html.slice(0, insertIndex) +
        "\n  " +
        metaTagsHTML +
        "\n  " +
        structuredDataHTML +
        html.slice(insertIndex)
      );
    }
  }

  // Insert after head tag opening
  return (
    html.slice(0, headIndex) +
    "\n  " +
    metaTagsHTML +
    "\n  " +
    structuredDataHTML +
    html.slice(headIndex)
  );
}







