interface ProductImages {
	id: number;
	productId: number;
	imageLink: string;
	position: number;
	alt?: string;  // Optional property due to String?
	isPrimary: boolean;
}

// You might also want a type for creating a new product image
interface CreateProductImageInput {
	id: number
	productId: number;
	imageLink: string;
	position: number;
	alt?: string;
	isPrimary?: boolean; // Optional since it has a default value
}

// And one for updating an existing product image
interface UpdateProductImageInput {
	imageLink?: string;
	position?: number;
	alt?: string | null;
	isPrimary?: boolean;
}

// Product interface
export interface Product {
	id: number;
	prodName: string;
	prodDescription: string;
	discount: number;
	price: number;
	mrp: number;
	stock: number;
	image: CreateProductImageInput[];
	unit: string;
	subcategoryId: number;
	createdAt: string;
	updatedAt: string;
}

// SubCategory interface with products
export interface SubCategory {
	id: number;
	name: string;
	image: string;
	categoryId: number;
	products: Product[];
}

export interface SubCategoryResponse {
	subCategories: SubCategory[];
	status: number;
}

export interface CartItem extends Product {
	quantity: number;
}
