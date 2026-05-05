import { Product } from '../data/products';
import { CONFIG } from '../config';

export interface Review {
  id: string;
  name: string;
  location: string;
  text: string;
  image?: string;
  rating?: number;
  featured: boolean;
}

const API_BASE = CONFIG.API_BASE_URL;

export const api = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async getReviews(): Promise<Review[]> {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  }
};
