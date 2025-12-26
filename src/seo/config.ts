/**
 * SEO Configuration
 * Centralized configuration for all SEO-related metadata
 */

export interface SEOConfig {
  siteName: string;
  siteDescription: string;
  siteKeywords: string[];
  siteUrl: string;
  author: string;
  ogImage: string;
  twitterHandle?: string;
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
  };
}

export const seoConfig: SEOConfig = {
  siteName: "inFoods IBS Trigger Food Navigator",
  siteDescription: "Navigate IBS trigger foods and find safe meal alternatives with personalized recipe recommendations. Identify trigger foods, get replacement suggestions, and discover recipes tailored to your dietary needs.",
  siteKeywords: [
    "IBS",
    "irritable bowel syndrome",
    "trigger foods",
    "food navigator",
    "IBS diet",
    "low FODMAP",
    "recipe finder",
    "dietary restrictions",
    "food alternatives",
    "meal planning",
    "digestive health",
    "inFoods"
  ],
  siteUrl: "https://trigger-food-navigator.sbehbahani.workers.dev",
  author: "inFoods",
  ogImage: "https://trigger-food-navigator.sbehbahani.workers.dev/inFoods%20Logo.png",
  twitterHandle: "@inFoodsIBS",
  organization: {
    name: "inFoods",
    url: "https://www.infoodsibs.com",
    logo: "https://trigger-food-navigator.sbehbahani.workers.dev/inFoods%20Logo.png",
    description: "inFoods provides tools and resources for managing IBS through personalized dietary guidance."
  }
};

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string = ""): string {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get the canonical URL for the current page
 */
export function getCanonicalUrl(path: string = "/Trigger%20Food%20Navigator"): string {
  return getFullUrl(path);
}







