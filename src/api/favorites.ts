import axios from 'axios';
import { API_BASE_URL } from './recipes';
import { getToken } from './auth';

export type Favorite = {
  id: number;
  documentId: string;
  recipe: {
    id: number;
    documentId: string;
    name: string;
    images?: { url: string }[];
    cookTime?: number;
    description?: string;
    calories?: number;
  };
};

export const getFavorites = async (): Promise<Favorite[]> => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await axios.get(`${API_BASE_URL}/api/favorites?populate=recipe`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data || [];

};

export const addFavorite = async (recipeDocumentId: string): Promise<Favorite> => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await axios.post(
    `${API_BASE_URL}/api/favorites/add`,
    {
      recipe: recipeDocumentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  return response.data;
};


export const removeFavorite = async (recipeDocumentId: string): Promise<void> => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  await axios.post(
    `${API_BASE_URL}/api/favorites/remove`,
    {
      recipe: recipeDocumentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};
