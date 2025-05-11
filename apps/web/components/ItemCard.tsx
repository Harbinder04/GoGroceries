import { Product } from '@/types/type';
import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
// import { useProductStore } from '@/store/productStore';
import Image from 'next/image';

const ItemCard = ({
	product,
	deliveryTime = '10min',
}: {
	product: Product;
	deliveryTime?: string;
}) => {
	const router = useRouter();
	const { addToCart, removeFromCart, getItemQuantity } = useCartStore();
	const quantity = getItemQuantity(product.id);
	// const { fetchProducts } = useProductStore();

	function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		try {
			router.push(
				`/prn/${product.prodName.replace(/\s+/g, '-')}/pid/${product.id}`
			);
		} catch (e: unknown) {
			console.error(e);
			console.log('unable to redirect');
		}
	}

	return (
		<div
			className='min-w-[200px] p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-2 cursor-pointer'
			onClick={handleCardClick}>
			<Image
				src={product.image[0]?.imageLink || 'https://placehold.co/600x400/png'}
				alt={product.image[0]?.alt || product.prodName}
				width={100}
				height={100}
				className='w-full h-40 object-contain mb-2'
			/>
			<div className='text-sm text-gray-500'>{deliveryTime}</div>
			<h3 className='font-medium text-gray-900 leading-tight'>
				{product.prodName}
			</h3>
			<div className='flex justify-between mt-auto items-center'>
				<p className='ml-2 font-semibold flex flex-col text-sm'>
					<span>₹{product.price}</span>
					<span className='text-gray-600'>₹{product.mrp}</span>
					<span className='border-gray-500 border-b-2 -translate-y-2.5'></span>
				</p>

				{quantity === 0 ? (
					<button
						className='px-4 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50 text-sm font-medium'
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							e.stopPropagation();
							addToCart(product);
							return;
						}}>
						ADD
					</button>
				) : (
					<div className='flex items-center bg-green-600 text-white rounded h-8'>
						<button
							className='px-2 h-full flex items-center justify-center font-bold text-lg'
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation();
								removeFromCart(product.id);
								return;
							}}>
							-
						</button>
						<span className='px-3'>{quantity}</span>
						<button
							className='px-2 h-full flex items-center justify-center font-bold text-lg'
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation();
								addToCart(product);
								return;
							}}>
							+
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemCard;
