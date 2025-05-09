'use client';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { Product } from '@/types/type';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const ProductDisplay = () => {
	const { fetchProducts } = useProductStore();
	const { addToCart, removeFromCart, getItemQuantity } = useCartStore();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState<Product | null>(null);
	const params = useParams();
	const [quantity, setQuantity] = useState(0);
	useEffect(() => {
		const loadProduct = async () => {
			// Handle case where pid might be an array
			console.log(params);
			const productId = params.productId as string;

			if (productId) {
				setLoading(true);
				try {
					const productData = await fetchProducts(Number(productId));
					setProduct(productData);
					setQuantity(getItemQuantity(productData.id));
				} catch (error) {
					console.error('Failed to fetch product:', error);
				} finally {
					setLoading(false);
				}
			}
		};

		loadProduct();
	}, [params.productId, fetchProducts, quantity, getItemQuantity, params]);

	if (loading) {
		return (
			<div className='h-[80dvh] w-screen flex justify-center items-center'>
				<div className='loader'></div>
			</div>
		);
	}

	return (
		<div className='flex flex-col lg:flex-row max-w-6xl mx-auto p-4 gap-8'>
			{/* Left side - Product images */}
			<div className='w-full lg:w-1/2'>
				<div className='mb-4'>
					<Image
						src={
							`${product?.image[0]?.imageLink}` ||
							`https://placehold.co/600x400`
						}
						alt={product?.image[0]?.alt || 'product'}
						width={100}
						height={100}
						className='w-full object-contain'
					/>
				</div>

				{/* Thumbnail gallery */}
				<div className='flex overflow-x-auto gap-2 pb-2'>
					{product?.image &&
						product.image.map((img) => (
							<div
								key={img.id}
								className='border border-gray-200 p-1 w-16 h-16 flex-shrink-0'>
								<Image
									src={img.imageLink}
									alt={`Thumbnail ${img.alt}`}
									className='w-full h-full object-contain'
								/>
							</div>
						))}
					<button className='flex items-center justify-center w-8 h-16 bg-white border border-gray-200'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<polyline points='9 18 15 12 9 6'></polyline>
						</svg>
					</button>
				</div>
			</div>

			{/* Right side - Product details */}
			<div className='w-full lg:w-1/2'>
				{/* Breadcrumb */}
				<div className='text-sm text-gray-600 mb-4'>
					<Link href='http://localhost:3000'>Home</Link>/ Milk /{' '}
					{product?.prodName}
				</div>

				{/* Product title */}
				<h1 className='text-3xl font-bold mb-4'>{product?.prodName}</h1>

				{/* Brand link */}
				<div className='mb-6'>
					<a href='#' className='text-green-600 hover:text-green-700'>
						View all by Verka ›
					</a>
				</div>

				{/* Unit selection */}
				<div className='mb-6'>
					<p className='mb-2 font-medium'>Select Unit</p>
					<div className='flex gap-4'>
						<button
							// onClick={() => handleUnitSelect('500ml')}
							className={`border rounded-md py-2 px-4 flex flex-col items-center min-w-24 border-green-500`}>
							<span>{product?.unit}</span>
							<span className='font-medium'>MRP ₹{product?.price}</span>
						</button>
					</div>
					<p className='text-sm text-gray-500 mt-2'>(Inclusive of all taxes)</p>
				</div>

				{/* Add to cart button */}
				<div className='mb-8 w-fit'>
					{product && quantity === 0 ? (
						<button
							className='px-4 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50 hover:cursor-pointer text-sm font-medium '
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation();
								addToCart(product);
								return;
							}}>
							ADD
						</button>
					) : (
						<div className='flex items-center bg-green-600 text-white rounded h-8'>
							{product && (
								<button
									className='px-2 h-full flex items-center justify-center font-bold text-lg hover:cursor-pointer'
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.stopPropagation();
										removeFromCart(product.id);
										return;
									}}>
									-
								</button>
							)}
							<span className='px-3'>{quantity}</span>
							{product && (
								<button
									className='px-2 h-full flex items-center justify-center font-bold text-lg hover:cursor-pointer'
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.stopPropagation();
										addToCart(product);
										return;
									}}>
									+
								</button>
							)}
						</div>
					)}
				</div>

				{/* Why shop section */}
				<div>
					<h2 className='text-xl font-medium mb-4'>Why shop from blinkit?</h2>

					{/* Superfast delivery */}
					<div className='flex gap-4 mb-4'>
						<div className='w-12 h-12'>
							<Image
								src='https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/10_minute_delivery.png'
								alt='Fast delivery'
								className='w-full h-full object-contain'
							/>
						</div>
						<div>
							<h3 className='font-medium'>Superfast Delivery</h3>
							<p className='text-gray-600'>
								Get your order delivered to your doorstep at the earliest from
								dark stores near you.
							</p>
						</div>
					</div>

					{/* Best prices */}
					<div className='flex gap-4 mb-4'>
						<div className='w-12 h-12'>
							<Image
								src='https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Best_Prices_Offers.png'
								alt='Best prices'
								className='w-full h-full object-contain'
							/>
						</div>
						<div>
							<h3 className='font-medium'>Best Prices & Offers</h3>
							<p className='text-gray-600'>
								Best price destination with offers directly from the
								manufacturers.
							</p>
						</div>
					</div>

					{/* Wide assortment */}
					<div className='flex gap-4'>
						<div className='w-12 h-12'>
							<Image
								src='https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Wide_Assortment.png'
								alt='Wide assortment'
								className='w-full h-full object-contain'
							/>
						</div>
						<div>
							<h3 className='font-medium'>Wide Assortment</h3>
							<p className='text-gray-600'>
								Choose from 5000+ products across food, personal care, household
								& more.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDisplay;
