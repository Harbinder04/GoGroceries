import { create } from 'zustand';
import { Product, CartItem } from '@/types/type';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface CartState {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;

	// Actions
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string | number) => void;
	updateQuantity: (productId: string | number, quantity: number) => void;
	clearCart: () => void;
	getItemQuantity: (productId: string | number) => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			totalItems: 0,
			totalPrice: 0,

			addToCart: async (product: Product) => {
				// console.log('Product passed to addToCart:', product);
				const currentItems = get().items;
				const existingItem = currentItems.find(
					(item) => item.id === product.id
				);

				if (existingItem) {
					const updateItems = currentItems.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					);

					set((state) => ({
						items: updateItems,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}));
				} else {
					set((state) => ({
						items: [...state.items, { ...product, quantity: 1 }],
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}));
				}

				try {
					await axios.post('http://localhost:3000/api/cart', {
						productId: product.id,
						quantity: 1,
						action: 'add',
					});
				} catch (error: unknown) {
					if (axios.isAxiosError(error)) {
						console.error('Axios error:', error.message);
					} else {
						console.error('Unexpected error:', error);
					}
				}
			},

			removeFromCart: async (productId) => {
				const currentItems = get().items;
				const itemToRemove = currentItems.find((item) => item.id === productId);

				if (!itemToRemove) return;

				if (itemToRemove.quantity > 1) {
					const updateItems = currentItems.map((item) =>
						item.id === productId
							? { ...item, quantity: item.quantity - 1 }
							: item
					);

					set((state) => ({
						items: updateItems,
						totalItems: state.totalItems - 1,
						totalPrice: state.totalPrice - itemToRemove.price,
					}));
				} else {
					set((state) => ({
						items: state.items.filter((item) => item.id !== productId),
						totalItems: state.totalItems - 1,
						totalPrice: (state.totalPrice = itemToRemove.price),
					}));
				}

				try {
					await axios.post('http://localhost:3000/api/cart', {
						productId,
						quantity: 1,
						action: 'remove',
					});
				} catch (err: unknown) {
					console.log('Error syncing cart with server:', err);
				}
			},

			updateQuantity: async (productId, quantity) => {
				const currentItems = get().items;
				const itemToUpdate = currentItems.find((item) => item.id === productId);

				if (!itemToUpdate) return;

				const quantityDiff = quantity - itemToUpdate.quantity;
				const priceDiff = itemToUpdate.price * quantityDiff;

				if (quantity <= 0) {
					set((state) => ({
						items: state.items.filter((item) => item.id !== productId),
						totalItems: state.totalItems - itemToUpdate.quantity,
						totalPrice:
							state.totalPrice - itemToUpdate.price * itemToUpdate.quantity,
					}));
				} else {
					const updateItems = currentItems.map((item) =>
						item.id === productId ? { ...item, quantity } : item
					);

					set((state) => ({
						items: updateItems,
						totalItems: state.totalItems + quantityDiff,
						totalPrice: state.totalPrice + priceDiff,
					}));
				}

				try {
					await axios.post('http://localhost:3000/api/cart', {
						productId,
						quantity,
						action: 'update',
					});
				} catch (err: unknown) {
					console.error('Error syncing cart with server:', err);
				}
			},
			clearCart: async () => {
				set({ items: [], totalItems: 0, totalPrice: 0 });

				try {
					await axios.post(
						'http://localhost:3000/api/cart',
						{
							action: 'clear',
						},
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);
				} catch (err: unknown) {
					console.error('Error syncing cart with server:', err);
				}
			},

			getItemQuantity: (productId) => {
				const item = get().items.find((item) => item.id === productId);
				return item ? item.quantity : 0;
			},
		}),
		{
			name: 'shopping-cart',
		}
	)
);
