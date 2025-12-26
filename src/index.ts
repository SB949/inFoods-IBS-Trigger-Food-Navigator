import { fromHono } from "chanfana";
import { Context, Hono } from "hono";
import { Verify } from "endpoints/verify";
import { cors } from "hono/cors";
import { injectSEO } from "./seo/htmlInjector";
import { generateSitemap } from "./seo/sitemap";
import { generateRobots } from "./seo/robots";

// Start a Hono app
const app = new Hono();
const isDevelopment = process.env.NODE_ENV === "development";

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

openapi.use(
  "*",
  cors({
    origin: (origin, c) => {
      if (isDevelopment) {
        return origin;
      }

      return c.env.ALLOWED_ORIGINS.some((allowed) =>
        origin.startsWith(allowed)
      );
    },
  })
);

// SEO endpoints - must be registered before asset handling middleware
openapi.get("/sitemap.xml", async (c: Context) => {
  const sitemap = generateSitemap();
  return c.text(sitemap, 200, {
    "Content-Type": "application/xml; charset=utf-8",
  });
});

openapi.get("/robots.txt", async (c: Context) => {
  const robots = generateRobots();
  return c.text(robots, 200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
});

// Intercept HTML requests to inject SEO
openapi.use(async (c: Context, next) => {
  // Skip SEO endpoints and API routes
  if (c.req.path === "/sitemap.xml" || c.req.path === "/robots.txt" || c.req.path.startsWith("/api/")) {
    await next();
    return;
  }

  // Handle static assets
  const assetResponse = await c.env.ASSETS.fetch(c.req.url);
  
  // Check if it's an HTML file
  const contentType = assetResponse.headers.get("content-type") || "";
  const isHTML = contentType.includes("text/html") || 
                 c.req.path.endsWith(".html") ||
                 c.req.path.includes("Trigger Food Navigator");
  
  if (isHTML && assetResponse.ok) {
    const html = await assetResponse.text();
    const enhancedHTML = injectSEO(html, c.req.path);
    
    // Preserve other headers from original response (excluding content-type)
    const headers: Record<string, string> = {
      "Content-Type": "text/html; charset=utf-8",
    };
    
    assetResponse.headers.forEach((value, key) => {
      if (!key.toLowerCase().includes("content-type")) {
        headers[key] = value;
      }
    });
    
    return c.html(enhancedHTML, 200, headers);
  }
  
  return assetResponse;
});

// Register OpenAPI endpoints
openapi.post("/api/verify", Verify);

// Export the Hono app
export default app;
