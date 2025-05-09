'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@store/categoryStrore';
import Image from 'next/image';

interface CategoryModal {
	id: number;
	name: string;
	image: string;
}

const GroceryCategories = () => {
	const [categories, setCategories] = useState<CategoryModal[] | null>(null);

	const { subCategories, fetchSubCategories } = useCategoryStore();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();
	console.log(subCategories);
	// Pass categoryId as parameter to the function
	async function handleCategoryClick(categoryId: number, categoryName: string) {
		try {
			setLoading(true);
			const response = await fetchSubCategories(categoryId);
			const currentSubCategories = useCategoryStore.getState().subCategories;
			if (response?.success) {
				const formattedCatName = categoryName.replace(/\s+/g, '-');
				router.push(
					`/cn/${formattedCatName}/sc/${currentSubCategories[0]?.name.replace(/\s+/g, '-')}`
				);
			} else {
				setError('No subcategories found');
			}
		} catch (e: unknown) {
			// Changed from Error to unknown
			if (e instanceof Error) {
				setError(e.message || 'Failed to fetch subcategories');
			} else {
				setError('Failed to fetch subcategories');
			}
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3000/api/categories'
				);
				if (response) setCategories(response.data.data);
			} catch (e: unknown) {
				// Changed from Error to unknown
				if (e instanceof Error) {
					console.error(e);
					setError(e.message || 'Failed to fetch categories');
				} else {
					setError('Failed to fetch categories');
				}
			}
		};

		getCategories();
	}, []);

	if (loading) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4'>
					{Array.from({ length: 17 }, (_, index) => (
						<div
							role='status'
							className='flex items-center justify-center h-full w-auto bg-gray-300 rounded-lg animate-pulse dark:bg-gray-500'
							key={index}>
							<div className='w-[128px] h-[188px] bg-gray-200 rounded-lg'></div>
						</div>
					))}
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<p className='text-center mt-4 text-red-500'>{error}</p>
			</div>
		);
	}
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4'>
				{categories &&
					categories.map((category) => (
						<div
							key={category.id}
							onClick={() => handleCategoryClick(category.id, category.name)}
							className='flex flex-col items-center h-full w-auto cursor-pointer hover:opacity-80 transition-opacity'>
							<div className='bg-gray-100 rounded-lg w-[128px] h-[188px]'>
								<Image
									src={category.image}
									width={100}
									height={100}
									alt={category.name}
									className='w-fit h-fit object-contain mx-auto'
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default GroceryCategories;
