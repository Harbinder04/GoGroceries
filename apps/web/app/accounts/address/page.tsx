import React from 'react';
import {
	Home,
	CreditCard,
	Key,
	LogOut,
	User,
	ShoppingBag,
	MoreVertical,
	Plus,
} from 'lucide-react';

const UserAddressPage = () => {
	// Sample user data
	const user = {
		phoneNumber: '+918219921569',
		addresses: [
			{
				id: 1,
				type: 'Home',
				address: 'Floor 1, Rudransh pg, Kharar, India',
			},
			{
				id: 2,
				type: 'Home',
				address:
					'Floor 00, House no. - 232, Near Sanjay Jewellers, Hamirpur Himachal Pradesh, India',
			},
			{
				id: 3,
				type: 'Home',
				address:
					'Floor 00, House no. - 232, Near Sanjay Jewellers, Hamirpur Himachal Pradesh, India',
			},
			{
				id: 4,
				type: 'Home',
				address:
					'Floor 00, House no. - 232, Near Sanjay Jewellers, Hamirpur Himachal Pradesh, India',
			},
			{
				id: 5,
				type: 'Home',
				address:
					'Floor 00, House no. - 232, Near Sanjay Jewellers, Hamirpur Himachal Pradesh, India',
			},
		],
	};

	return (
		<div className='flex max-w-4xl mx-auto my-8 shadow-sm border rounded-lg'>
			{/* Left sidebar navigation */}
			<div className='w-64 border-r'>
				{/* Phone number display */}
				<div className='p-6 border-b'>
					<p className='text-gray-700'>{user.phoneNumber}</p>
				</div>

				{/* Navigation items */}
				<nav>
					<ul>
						<li className='border-b'>
							<a href='#' className='flex items-center px-6 py-4 text-gray-700'>
								<User className='h-5 w-5 mr-3' />
								<span>My Addresses</span>
							</a>
						</li>
						<li className='border-b'>
							<a
								href='#'
								className='flex items-center px-6 py-4 text-gray-700 hover:bg-green-50'>
								<ShoppingBag className='h-5 w-5 mr-3' />
								<span>My Orders</span>
							</a>
						</li>
						<li className='border-b'>
							<a
								href='#'
								className='flex items-center px-6 py-4 text-gray-700 hover:bg-green-50'>
								<CreditCard className='h-5 w-5 mr-3' />
								<span>E-Gift Cards</span>
							</a>
						</li>
						<li className='border-b'>
							<a
								href='#'
								className='flex items-center px-6 py-4 text-gray-700 hover:bg-green-50'>
								<Key className='h-5 w-5 mr-3' />
								<span>Account privacy</span>
							</a>
						</li>
						<li className='border-b'>
							<a
								href='#'
								className='flex items-center px-6 py-4 text-gray-700 hover:bg-green-50'>
								<LogOut className='h-5 w-5 mr-3' />
								<span>Logout</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>

			{/* Right content area */}
			<div className='flex-1 p-6'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-2xl font-medium'>My addresses</h1>
				</div>

				{/* Add new address button */}
				<button className='flex items-center text-green-600 mb-6 hover:text-green-700'>
					<Plus className='w-5 h-5 mr-1' />
					<span>Add new address</span>
				</button>

				{/* Address cards */}
				<div className='space-y-4'>
					{user.addresses.map((address) => (
						<div
							key={address.id}
							className='flex items-start bg-gray-50 p-4 rounded-md'>
							<div className='mr-3 mt-1'>
								<div className='bg-yellow-100 p-2 rounded'>
									<Home className='w-5 h-5 text-yellow-500' />
								</div>
							</div>
							<div className='flex-1'>
								<h3 className='font-medium'>{address.type}</h3>
								<p className='text-gray-600'>{address.address}</p>
							</div>
							<button className='text-gray-500'>
								<MoreVertical className='w-5 h-5' />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserAddressPage;
