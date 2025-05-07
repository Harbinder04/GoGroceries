import { create } from 'zustand';
import { Product } from '@/types/type';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface ProductState {
	// Actions
	product: Product | null;
	fetchProducts: (productId: string | number) => Promise<Product>;
}

export const useProductStore = create<ProductState>()(
	persist(
		(set) => ({
			product: null,
			fetchProducts: async (productId) => {
				const response = await axios.get(
					`http://localhost:3000/api/product?id=${productId}`
				);
				if (response.status !== 200) {
					throw new Error('Failed to fetch subcategories');
				}
				console.log(response.data.product);
				set({ product: response.data.product });
				return response.data.product;
			},
		}),
		{ name: 'product-store' }
	)
);
