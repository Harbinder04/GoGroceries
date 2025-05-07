'use client';

import React from 'react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@repo/ui/lucide-react';
// import ItemCard from './ItemCard';

const ProductSlider = () => {
	const scrollRef = useRef<HTMLDivElement | null>(null);

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			const scrollAmount = direction === 'left' ? -400 : 400;
			scrollRef.current.scrollBy({
				left: scrollAmount,
				behavior: 'smooth',
			} as ScrollToOptions);
		}
	};

	return (
		<div className='relative max-w-7xl mx-auto'>
			<div className='flex items-center'>
				<button
					onClick={() => scroll('left')}
					className={`absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 ${scrollRef.current}`}>
					<ChevronLeft className='w-6 h-6' />
				</button>

				<div
					ref={scrollRef}
					className='flex gap-4 overflow-x-auto py-4 px-8 scroll-smooth no-scrollbar'
					style={{
						scrollbarWidth: 'none',
						msOverflowStyle: 'none',
					}}>
					{/* {products.map((product, index) => (
						<ItemCard key={index} product={product} />
					))} */}
				</div>

				<button
					onClick={() => scroll('right')}
					className='absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50'>
					<ChevronRight className='w-6 h-6' />
				</button>
			</div>
		</div>
	);
};

export default ProductSlider;
