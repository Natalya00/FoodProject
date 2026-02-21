import axios from 'axios';

const API_BASE_URL = 'https://front-school-strapi.ktsdev.ru';

export const getRecipes = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/recipes?populate[0]=images`);
  return response.data.data;
};

export type RecipeResponse = {
  id: number;
  name: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  rating: number;
  reviewCount?: number;
  images: { url: string }[];
  description: string;
  ingredients: string[];
  instructions: string[];
  equipment?: string[];
};

function normalizeRecipe(raw: Record<string, unknown>): RecipeResponse {
  const ingradients = (raw.ingradients as Array<{ name?: string; amount?: string; unit?: string } | string>) ?? [];
  const directions = (raw.directions as Array<{ text?: string; description?: string; step?: string }>) ?? [];
  const equipments = (raw.equipments as Array<{ name?: string } | string>) ?? [];

  const ingredients = ingradients.map((i) =>
    typeof i === 'string' ? i : [i.amount, i.unit, i.name].filter(Boolean).join(' ').trim() || (i.name ?? '')
  );
  const instructions = directions.map((d) => (d.text ?? d.description ?? d.step ?? ''));
  const equipment = equipments.map((e) => (typeof e === 'string' ? e : e.name ?? ''));

  return {
    id: (raw.id as number) ?? 0,
    name: (raw.name as string) ?? '',
    prepTime: (raw.preparationTime as number) ?? 0,
    cookTime: (raw.cookingTime as number) ?? 0,
    servings: (raw.servings as number) ?? 0,
    rating: (raw.rating as number) ?? 0,
    reviewCount: (raw.likes as number) ?? undefined,
    images: Array.isArray(raw.images) ? (raw.images as { url: string }[]) : [],
    description: (raw.summary as string) ?? '',
    ingredients,
    instructions,
    equipment: equipment.length > 0 ? equipment : undefined,
  };
}

export const getRecipeById = async (documentId: string): Promise<RecipeResponse> => {
  const response = await axios.get(
    `${API_BASE_URL}/api/recipes/${documentId}?populate[0]=ingradients&populate[1]=equipments&populate[2]=directions.image&populate[3]=images&populate[4]=category`
  );
  const raw = response.data.data;
  if (!raw) throw new Error('Recipe not found');
  return normalizeRecipe(typeof raw.attributes === 'object' ? { id: raw.id, documentId: raw.documentId, ...raw.attributes } : raw);
};
