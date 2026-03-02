import axios from 'axios';

export const API_BASE_URL = 'https://front-school-strapi.ktsdev.ru';

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/recipes?populate[0]=images`);
  const rawData = response.data.data;
  
  if (!Array.isArray(rawData)) return [];
  
  return rawData.map((item: Record<string, unknown>) => {
    return normalizeRecipe(item as RecipeResponse);
  });
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/meal-categories?populate=*`);
  const rawData = response.data.data;
  
  if (!Array.isArray(rawData)) return [];
  
  return rawData.map((item: Record<string, unknown>) => {
    return {
      id: item.id as number,
      documentId: (item.documentId as string) ?? '',
      name: (item.title as string) ?? '',
    };
  });
};

export const searchRecipes = async (
  searchQuery: string, 
  categoryIds: number[] = [],
  page: number = 1,
  limit: number = 9
): Promise<{ recipes: Recipe[]; total: number }> => {
  const params = new URLSearchParams({
    populate: 'images',
    'pagination[page]': page.toString(),
    'pagination[pageSize]': limit.toString(),
  });
  
  if (searchQuery.trim()) {
    params.append('filters[name][$containsi]', searchQuery.trim());
  }
  
  if (categoryIds.length > 0) {
    categoryIds.forEach((id, index) => {
      params.append(`filters[$or][${index}][category][id]`, id.toString());
    });
  }
  
  const response = await axios.get(`${API_BASE_URL}/api/recipes?${params.toString()}`);
  const rawData = response.data.data;
  const meta = response.data.meta;
  
  if (!Array.isArray(rawData)) return { recipes: [], total: 0 };
  
  const recipes = rawData.map((item: Record<string, unknown>) => {
    return normalizeRecipe(item as RecipeResponse);
  });
  
  return {
    recipes,
    total: meta?.pagination?.total || 0,
  };
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
};

export type RecipeResponse = {
  id: number;
  documentId?: string;
  name?: string;
  preparationTime?: number;
  cookingTime?: number;
  totalTime?: number;
  servings?: number;
  rating?: number;
  likes?: number;
  calories?: number;
  images?: { url: string }[];
  summary?: string;
  description?: string;
  ingradients?: Array<{ name?: string; amount?: string; unit?: string } | string>;
  directions?: Array<{ text?: string; description?: string; step?: string }>;
  equipments?: Array<{ name?: string } | string>;
};

export type Recipe = {
  id: number;
  documentId: string;
  name: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  rating: number;
  reviewCount?: number;
  calories?: number;
  images: { url: string }[];
  description: string;
  ingredients: string[];
  instructions: string[];
  equipment?: string[];
};

function normalizeRecipe(raw: RecipeResponse): Recipe {
  const ingradients = raw.ingradients ?? [];
  const directions = raw.directions ?? [];
  const equipments = raw.equipments ?? [];

  const ingredients = ingradients.map((i) =>
    typeof i === 'string' ? i : [i.amount, i.unit, i.name].filter(Boolean).join(' ').trim() || (i.name ?? '')
  );
  const instructions = directions.map((d) => (d.text ?? d.description ?? d.step ?? ''));
  const equipment = equipments.map((e) => (typeof e === 'string' ? e : e.name ?? ''));

  return {
    id: raw.id ?? 0,
    documentId: raw.documentId ?? '',
    name: raw.name ?? '',
    prepTime: raw.preparationTime ?? 0,
    cookTime: raw.cookingTime ?? 0,
    servings: raw.servings ?? 0,
    rating: raw.rating ?? 0,
    reviewCount: raw.likes,
    calories: raw.calories,
    images: raw.images ?? [],
    description: raw.summary ?? raw.description ?? '',
    ingredients,
    instructions,
    equipment: equipment.length > 0 ? equipment : undefined,
  };
}

export const getRecipeById = async (documentId: string): Promise<Recipe> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/recipes/${documentId}?populate[0]=ingradients&populate[1]=equipments&populate[2]=directions.image&populate[3]=images&populate[4]=category`
    );

    const raw = response.data?.data;
    
    if (!raw) {
      throw new Error('Recipe not found');
    }

    const recipeData = typeof raw.attributes === 'object' 
      ? { id: raw.id, documentId: raw.documentId, ...raw.attributes } 
      : raw;
      
    return normalizeRecipe(recipeData as RecipeResponse);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch recipe');
    }
    throw error;
  }
};
