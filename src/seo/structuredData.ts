/**
 * Structured Data (JSON-LD) Generators
 * Creates schema.org structured data for better search engine understanding
 */

import { seoConfig, getFullUrl } from "./config";

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoConfig.organization.name,
    "url": seoConfig.organization.url,
    "logo": seoConfig.organization.logo,
    "description": seoConfig.organization.description,
    "sameAs": [
      seoConfig.organization.url
    ]
  };
}

/**
 * Generate WebApplication structured data
 */
export function generateWebApplicationSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": seoConfig.siteName,
    "description": seoConfig.siteDescription,
    "url": getFullUrl("/Trigger%20Food%20Navigator"),
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.organization.name,
      "url": seoConfig.organization.url,
      "logo": {
        "@type": "ImageObject",
        "url": seoConfig.organization.logo
      }
    }
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": seoConfig.organization.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": seoConfig.siteName,
        "item": getFullUrl("/Trigger%20Food%20Navigator")
      }
    ]
  };
}

/**
 * Generate all structured data schemas
 */
export function generateAllStructuredData(): StructuredData[] {
  return [
    generateOrganizationSchema(),
    generateWebApplicationSchema(),
    generateBreadcrumbSchema()
  ];
}

/**
 * Convert structured data to JSON-LD script tag HTML
 */
export function structuredDataToScriptTags(data: StructuredData[]): string {
  return data
    .map((schema) => {
      return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
    })
    .join("\n");
}







