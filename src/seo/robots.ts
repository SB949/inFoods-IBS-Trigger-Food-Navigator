/**
 * Robots.txt Generation
 * Creates robots.txt file for search engine crawlers
 */

import { seoConfig, getFullUrl } from "./config";

export interface RobotsConfig {
  userAgents: {
    agent: string;
    allow?: string[];
    disallow?: string[];
    crawlDelay?: number;
  }[];
  sitemap?: string;
}

/**
 * Generate robots.txt content
 */
export function generateRobots(config: RobotsConfig | null = null): string {
  const defaultConfig: RobotsConfig = {
    userAgents: [
      {
        agent: "*",
        allow: ["/"],
        disallow: ["/api/"]
      }
    ],
    sitemap: getFullUrl("/sitemap.xml")
  };

  const robotsConfig = config || defaultConfig;

  const rules = robotsConfig.userAgents
    .map(({ agent, allow, disallow, crawlDelay }) => {
      const lines: string[] = [`User-agent: ${agent}`];

      if (allow) {
        allow.forEach((path) => {
          lines.push(`Allow: ${path}`);
        });
      }

      if (disallow) {
        disallow.forEach((path) => {
          lines.push(`Disallow: ${path}`);
        });
      }

      if (crawlDelay) {
        lines.push(`Crawl-delay: ${crawlDelay}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");

  const sitemapLine = robotsConfig.sitemap ? `\n\nSitemap: ${robotsConfig.sitemap}` : "";

  return `${rules}${sitemapLine}`;
}







