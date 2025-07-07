import { fromHono } from "chanfana";
import { Context, Hono } from "hono";
import { Verify } from "endpoints/verify";
import { cors } from "hono/cors";

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

openapi.use(async (c: Context, next) => {
  if (!c.req.path.startsWith("/api/")) {
    return c.env.ASSETS.fetch(c.req.url);
  } else {
    await next();
  }
});

// Register OpenAPI endpoints
openapi.post("/api/verify", Verify);

// Export the Hono app
export default app;
