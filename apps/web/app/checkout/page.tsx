'use client';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from '@repo/ui/sooner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CheckoutPage = () => {
	const { items, totalPrice, clearCart } = useCartStore();
	const [paymentMethod, setPaymentMethod] = useState('');
	const [address, setAddress] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [loading, setLoading] = useState(false);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const router = useRouter();

	// Calculate cart summary
	const subtotal = totalPrice;
	const deliveryFee = subtotal > 0 ? 40 : 0;
	const total = subtotal + deliveryFee;

	useEffect(() => {
		// If cart is empty and not after order placement, redirect to home
		// if (items.length === 0 && !orderPlaced) {
		// 	router.push('/');
		// }
	}, [items, router, orderPlaced]);
	// Handle payment method selection
	const handlePaymentSelect = (method: 'gpay' | 'cod') => {
		setPaymentMethod(method);
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		if (!paymentMethod) {
			toast.error('Please select a payment method', {
				position: 'top-right',
			});
			return;
		}

		setLoading(true);

		try {
			// Simulate order processing
			await new Promise((resolve) => setTimeout(resolve, 1500));

			if (paymentMethod === 'gpay') {
				// In a real app, you would redirect to Google Pay or open the GPay modal
				handleGPayCheckout();
			} else {
				// For COD, process the order directly
				processOrder();
			}
		} catch (error) {
			console.error('Checkout failed:', error);
			alert('Failed to process your order. Please try again.');
			setLoading(false);
		}
	};

	const handleGPayCheckout = () => {
		// Simulate GPay processing
		setTimeout(() => {
			processOrder();
		}, 1000);
	};

	const processOrder = () => {
		// Create order (in a real app, this would call your API)
		const order = {
			items,
			total,
			address,
			name,
			phone,
			paymentMethod,
			orderId: `ORD-${Date.now()}`,
			orderDate: new Date().toISOString(),
		};

		console.log('Order placed:', order);

		// Clear cart and show success
		clearCart();
		setOrderPlaced(true);
		setLoading(false);
	};

	if (orderPlaced) {
		return (
			<div className='max-w-6xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center'>
				<div className='text-center p-8 bg-white rounded-lg shadow-md w-full max-w-md'>
					<div className='mb-6 flex justify-center'>
						<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='32'
								height='32'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='text-green-600'>
								<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
								<polyline points='22 4 12 14.01 9 11.01'></polyline>
							</svg>
						</div>
					</div>
					<h2 className='text-2xl font-bold text-green-600 mb-2'>
						Order Placed Successfully!
					</h2>
					<p className='text-gray-600 mb-6'>
						Thank you for your order. We will deliver it to you shortly.
					</p>
					<Link href='/'>
						<button className='bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors w-full'>
							Continue Shopping
						</button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-6xl mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Checkout</h1>

			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Left column - Order details */}
				<div className='w-full lg:w-2/3'>
					<div className='bg-white p-6 rounded-lg shadow-sm mb-6'>
						<h2 className='text-xl font-semibold mb-4'>Delivery Address</h2>
						<form>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Full Name
									</label>
									<input
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='w-full p-2 border border-gray-300 rounded-md'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Phone Number
									</label>
									<input
										type='tel'
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className='w-full p-2 border border-gray-300 rounded-md'
										required
									/>
								</div>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Complete Address
								</label>
								<textarea
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className='w-full p-2 border border-gray-300 rounded-md'
									rows={3}
									required
								/>
							</div>
						</form>
					</div>

					<div className='bg-white p-6 rounded-lg shadow-sm mb-6'>
						<h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
						<div className='max-h-64 overflow-y-auto mb-4'>
							{items.map((item) => (
								<div
									key={item.id}
									className='flex items-center justify-between py-2 border-b'>
									<div className='flex items-center'>
										<div className='w-16 h-16 mr-4'>
											{item.image && item.image[0] && (
												<Image
													src={
														item.image[0].imageLink ||
														'https://placehold.co/100x100'
													}
													alt={item.prodName}
													width={100} // or your desired width
													height={100} // or your desired height
													className='w-full h-full object-contain'
													unoptimized={
														item.image[0].imageLink?.startsWith('http')
															? false
															: true
													}
												/>
											)}
										</div>
										<div>
											<p className='font-medium'>{item.prodName}</p>
											<p className='text-sm text-gray-600'>
												{item.unit} - ₹{item.price}
											</p>
											<p className='text-sm text-gray-600'>
												Qty: {item.quantity}
											</p>
										</div>
									</div>
									<div className='font-medium'>
										₹{(item.price * item.quantity).toFixed(2)}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='bg-white p-6 rounded-lg shadow-sm'>
						<h2 className='text-xl font-semibold mb-4'>Payment Method</h2>
						<div className='space-y-4'>
							<div
								className={`border rounded-md p-4 flex items-center cursor-pointer ${paymentMethod === 'gpay' ? 'border-green-500 bg-green-50' : ''}`}
								onClick={() => handlePaymentSelect('gpay')}>
								<div className='w-10 h-10 mr-4'>
									<Image
										src='https://cdn.iconscout.com/icon/free/png-256/free-google-pay-2038779-1721670.png'
										alt='Google Pay'
										className='w-full h-full object-contain'
									/>
								</div>
								<div>
									<p className='font-medium'>Google Pay</p>
									<p className='text-sm text-gray-600'>
										Pay securely with Google Pay
									</p>
								</div>
								{paymentMethod === 'gpay' && (
									<div className='ml-auto'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='text-green-600'>
											<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
											<polyline points='22 4 12 14.01 9 11.01'></polyline>
										</svg>
									</div>
								)}
							</div>

							<div
								className={`border rounded-md p-4 flex items-center cursor-pointer ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : ''}`}
								onClick={() => handlePaymentSelect('cod')}>
								<div className='w-10 h-10 mr-4 flex items-center justify-center bg-gray-100 rounded-full'>
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
										<rect x='2' y='4' width='20' height='16' rx='2'></rect>
										<circle cx='12' cy='12' r='4'></circle>
									</svg>
								</div>
								<div>
									<p className='font-medium'>Cash on Delivery</p>
									<p className='text-sm text-gray-600'>
										Pay when your order arrives
									</p>
								</div>
								{paymentMethod === 'cod' && (
									<div className='ml-auto'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='text-green-600'>
											<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
											<polyline points='22 4 12 14.01 9 11.01'></polyline>
										</svg>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Right column - Price summary */}
				<div className='w-full lg:w-1/3'>
					<div className='bg-white p-6 rounded-lg shadow-sm sticky top-4'>
						<h2 className='text-xl font-semibold mb-4'>Price Details</h2>
						<div className='space-y-3 mb-4'>
							<div className='flex justify-between'>
								<span>Subtotal</span>
								<span>₹{subtotal.toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span>Delivery Fee</span>
								<span>₹{deliveryFee.toFixed(2)}</span>
							</div>
							<div className='border-t pt-3 flex justify-between font-bold'>
								<span>Total</span>
								<span>₹{total.toFixed(2)}</span>
							</div>
						</div>

						<button
							onClick={() =>
								handleSubmit(
									new Event(
										'submit'
									) as unknown as React.FormEvent<HTMLFormElement>
								)
							}
							disabled={
								loading || !name || !phone || !address || !paymentMethod
							}
							className={`w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium ${
								loading || !name || !phone || !address || !paymentMethod
									? 'opacity-50 cursor-not-allowed'
									: 'hover:bg-green-700'
							}`}>
							{loading ? (
								<div className='flex items-center justify-center'>
									<div className='w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2'></div>
									Processing...
								</div>
							) : (
								`Place Order - ₹${total.toFixed(2)}`
							)}
						</button>

						<div className='mt-4 text-center'>
							<Link href='/' className='text-green-600 hover:text-green-700'>
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
