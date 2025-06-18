import { z } from 'zod';
import recipes from '../data/recipes.json';
import recipes100_200 from '../data/recipes100-200.json';

interface Env {}

export interface PagesFunction<Env = any, Params extends string = any, Data extends Record<string, unknown> = Record<string, unknown>> {
  (context: EventContext<Env, Params, Data>): Response | Promise<Response>;
}

interface EventContext<Env = any, Params extends string = any, Data extends Record<string, unknown> = Record<string, unknown>> {
  request: Request;
  env: Env;
  params: Params;
  data: Data;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
}

const recipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  mealType: z.string(),
  calories: z.number(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  macros: z.object({
    protein: z.number(),
    carbs: z.number(),
    fat: z.number()
  }),
  image: z.string().optional()
});

const recipesResponseSchema = z.object({
  recipes: z.array(recipeSchema)
});

export const onRequest: PagesFunction = async (context) => {
  try {
    // Combine recipes from both files
    const allRecipes = [...recipes.recipes, ...recipes100_200.recipes];
    
    // Validate the combined recipes
    const validatedData = recipesResponseSchema.parse({ recipes: allRecipes });
    
    return new Response(JSON.stringify(validatedData), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load recipes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
