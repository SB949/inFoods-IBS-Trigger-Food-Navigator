import { fromHono } from "chanfana";
import { Context, Hono } from "hono";
import { Verify } from "endpoints/verify";
import { cors } from "hono/cors";
import { Recipes } from "endpoints/recipes";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

openapi.use(
  "/api/*",
  cors({
    origin: "*",
  })
);

openapi.use(async (c: Context, next) => {
  console.log(c.req.url);

  if (!c.req.path.startsWith("/api/")) {
    return c.env.ASSETS.fetch(c.req.url);
  } else {
    await next();
  }
});

// Register OpenAPI endpoints
openapi.post("/api/verify", Verify);
openapi.get("/api/recipes", Recipes);

// Export the Hono app
export default app;
