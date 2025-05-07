const axios = require('axios');

/* const categories = [
	{
		name: 'Fruits & Vegetables',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png',
	},
	{
		name: 'Cold Drinks & Juices',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-4_9.png',
	},
	{
		name: 'Snacks & Munchies',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png',
	},
	{
		name: 'Breakfast & Instant Food',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-6_5.png',
	},
	{
		name: 'Sweet Tooth',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png',
	},
	{
		name: 'Bakery & Biscuits',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-8_4.png',
	},
	{
		name: 'Tea, Coffee & Health Drinks',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-9_3.png',
	},
	{
		name: 'Atta, Rice & Dal',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-10.png',
	},
	{
		name: 'Nasala, Oil & More',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-11.png',
	},
	{
		name: 'Sauces & Spreads',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-12.png',
	},
	{
		name: 'Organic & Healthy Living',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-14.png',
	},
	{
		name: 'Baby Care',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-15.png',
	},
	{
		name: 'Cleaning Essentials',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-17.png',
	},
	{
		name: 'Home & Office',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-18.png',
	},
	{
		name: 'Personal Care',
		image:
			'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-19.png',
	},
];

*/

/* const subCategory1 = [
	{
		name: 'Accessories & Other Supplies',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1716287986266-3',
	},
	{
		name: 'Cat Needs',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717067945707-3',
	},
	{
		name: 'Diverse Pet Food',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717072632680-3',
	},
	{
		name: 'Dog Needs',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717137798882-3',
	},
	{
		name: 'Pet Grooming',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717146479043-3',
	},
]; */

// const product1 = [
// 	{
// 		prodName: 'HUFT TLC Nesting Nook Dog Bed (Aqua Blue)',
// 		prodDescription:
// 			'After a Long Day of Play, a Cosy Nook is All Your Pet Needs! Ensure the Best Rest for Your Pet With This Dog Bed. It is Designed Using Soft Fabric, Perfect for Every Season. Its Microfibre Filling is What Guarantees Utmost Comfort-your Dog Will Love Curling Up on It. The Anti-skid Base Makes Sure It Stays in Place, Without Scratching Your Floor.',
// 		price: 3599,
// 		mrp: 3999,
// 		stock: 10,
// 		unit: '1 unit',
// 		subCategoryId: 47,
// 	},
// 	{
// 		prodName: 'Nootie Dog Training Pad',
// 		prodDescription:
// 			'Nootie Dog Training Pads are Super Absorbent and Leak-proof, Making Them Ideal for Training Puppies and Senior Dogs. These Pads are Made of 5 Layers of Protection, Including a Leak-proof Plastic Liner, Quick-drying Gel, and a Tissue Layer.',
// 		price: 398,
// 		mrp: 699,
// 		stock: 10,
// 		unit: '1 pack (20 pieces)',
// 		subCategoryId: 47,
// 	},
// ];

/* const subCategory2 = [
	{
		name: 'Milk',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/922_1643384380004.png',
	},
	{
		name: 'Bread & Pav',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/953_1657599742631.png',
	},
	{
		name: 'Eggs',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/1200_1657599895699.png',
	},
	{
		name: 'Flakes & Kids Cereals',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/954_1680251634382.png',
	},
	{
		name: 'Muesli & Granola',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/614_1680251576771.png',
	},
	{
		name: 'Oats',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/584_1680251645977.png',
	},
	{
		name: 'Paneer & Tofu',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/923_1643384369257.png',
	},
	{
		name: 'Curd & Yogurt',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/123_1643384414434.png',
	},
	{
		name: 'Butter & More',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/952_1657599773117.png',
	},
	{
		name: 'Cheese',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/2253_1694001802103.png',
	},
	{
		name: 'Cream & whitener',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/1092_1643384330629.png',
	},
	{
		name: 'Condensed Milk',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/130_1643384401123.png',
	},
	{
		name: 'Vermicelli & Noodles',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/1140_1643384951835.png',
	},
	{
		name: 'Poha, Daliya & other Grains',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/1295_1643445863467.png',
	},
	{
		name: 'Peanut Butter',
		image:
			'https://cdn.grofers.com/app/images/category/cms_images/icon/644_1690196367179.png',
	},
];
*/
const product2 = [
	{
		prodName: 'Amul Gold Full Cream Fresh Milk',
		prodDescription:
			'Amul Gold Full Cream Milk (Polypack) Milk is homogenized toned pasteurized milk. Rich and creamy, this milk is an excellent source of vitamin A and vitamin D that enhances growth and development of the body tissues and the brain.',
		price: 34,
		mrp: 34,
		stock: 10,
		unit: '500 ml',
		subCategoryId: 30,
	},
	{
		prodName: 'Verka Standard Fresh Milk',
		prodDescription:
			'Verka Standard Fresh Milk is a high-quality milk product that is perfect for daily consumption. It is rich in calcium and protein, making it an ideal choice for a healthy diet.',
		price: 31,
		mrp: 31,
		stock: 10,
		unit: '500 ml',
		subCategoryId: 30,
	},
	{
		prodName: 'Verka Full Cream Fresh Milk',
		prodDescription:
			'Verka Full Cream Fresh Milk is a premium quality milk product that is rich in cream and flavor. It is perfect for making delicious desserts, smoothies, and other recipes.',
		price: 34,
		mrp: 34,
		stock: 10,
		unit: '500 ml',
		subCategoryId: 30,
	},
	{
		prodName: 'Amul Taaza Homogenised Toned Milk',
		prodDescription:
			'Amul Taaza Homogenised Toned Milk is a premium quality milk product that is rich in nutrients and flavor. It is perfect for making delicious smoothies, desserts, and other recipes.',
		price: 74,
		mrp: 74,
		stock: 10,
		unit: '1 ltr',
		subCategoryId: 30,
	},
	{
		prodName: 'Amul Gold Milk',
		prodDescription:
			'Amul Gold Milk is a premium quality milk product that is rich in cream and flavor. It is perfect for making delicious desserts, smoothies, and other recipes.',
		price: 80,
		mrp: 80,
		stock: 10,
		unit: '1 ltr',
		subCategoryId: 30,
	},
	{
		prodName: 'Amul Lactose Free Milk',
		prodDescription:
			'Amul Lactose Free Milk is a premium quality milk product that is lactose-free and perfect for people with lactose intolerance. It is rich in nutrients and flavor.',
		price: 25,
		mrp: 25,
		stock: 10,
		unit: '250 ml',
		subCategoryId: 30,
	},
	{
		prodName: 'Amul Gold Full Cream Fresh Milk + Baby Banana Combo',
		prodDescription:
			'Amul Gold Full Cream Fresh Milk + Baby Banana Combo is a perfect combination of healthy and delicious products. The milk is rich in cream and flavor, while the baby banana is a great source of vitamins and minerals.\n' +
			'Baby Banana :- Smaller version of Banana Robusta has similar characteristics - green skin that turns yellow as it ripens and has creamy white flesh inside. It can be eaten raw, used in baking, fruit salads and compotes.',
		price: 50,
		mrp: 50,
		stock: 10,
		unit: '500 ml + 4 pieces',
		subCategoryId: 30,
	},
];

// Insert data in random manner
/* Promise.all(
	subCategory2.map((subcategory) =>
		axios.post('http://localhost:3000/api/categories/subcategory', {
			...subcategory,
			categoryId: 2,
		})
	)
)
	.then((responses) => {
		responses.forEach((response, index) => {
			console.log(`Category ${categories[index].name} created:`, response.data);
		});
	})
	.catch((error) => {
		console.error('Error creating categories:', error);
	});
*/

async function insertSequentially() {
	const results = [];

	for (let i = 0; i < product2.length; i++) {
		try {
			const response = await axios.post('http://localhost:3000/api/products', {
				...product2[i],
			});
			console.log(response.data);
			console.log(`Product ${product2[i].prodName} created:`, response.data);
			results.push(response);
		} catch (error) {
			console.error(
				`Error creating product ${product2[i].prodName}:`,
				error.message
			);
		}
	}

	return results;
}

// Execute the sequential insertion
insertSequentially()
	.then(() => {
		console.log('All products created in order');
	})
	.catch((error) => {
		console.error('Error in sequential insertion:', error);
	});
