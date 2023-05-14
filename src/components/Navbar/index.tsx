'use client';
import Image from 'next/image';
import { useState } from 'react';
import BreadCrumb from './BreadCrumb';
import Cart from './Cart';

const Navbar = () => {
	const [cartHovered, setCartHovered] = useState(false);
	const [isCartVisible, setCartVisible] = useState(false);
	const [products, setProducts] = useState([
		{
			id: 1,
			name: 'Fall Limited Edition Sneakers',
			price: 125,
			image: 'image-product-1.jpg',
			quantity: 3,
		},
		{
			id: 2,
			name: 'Autumn Limited Edition Sneakers',
			price: 135,
			image: 'image-product-2.jpg',
			quantity: 2,
		},
	]);

	const links = [
		{
			id: 1,
			name: 'Collections',
			path: '#',
			isHovered: false,
		},
		{
			id: 2,
			name: 'Men',
			path: '#',
			isHovered: false,
		},
		{
			id: 3,
			name: 'Women',
			path: '#',
			isHovered: false,
		},
		{
			id: 4,
			name: 'About',
			path: '#',
			isHovered: false,
		},
		{
			id: 5,
			name: 'Contact',
			path: '#',
			isHovered: false,
		},
	];

	const handleDelete = (id: number) => {
		const newProducts = products.filter((product) => product.id !== id);
		setProducts(newProducts);
	};

	return (
		<nav className='relative px-6 pt-5 pb-5 lg:px-0 lg:pb-0 lg:pt-10 flex items-center justify-between border-b border-grayish-blue'>
			<Cart
				onDelete={handleDelete}
				isVisible={isCartVisible}
				products={products}
			/>
			<div className='flex items-start gap-14'>
				<Image
					src={require('../../../public/images/logo.svg')}
					alt='logo'
				/>
				<div className='hidden lg:flex gap-8 items-center flex-1'>
					{links.map((link, index) => (
						<span className='h-16 w-14 hover:border-b-4 hover:border-b-orange flex justify-center'>
							<a
								href={link.path}
								key={index}
								className='text-sm text-center text-dark-grayish-blue hover:text-very-dark-blue duration-200'
							>
								{link.name}
							</a>
						</span>
					))}
				</div>
				{/* <BreadCrumb
					links={links}
					className='absolute bottom-0 left-48'
				/> */}
			</div>
			<div className='flex items-center gap-10 lg:-translate-y-5'>
				<span
					onMouseOver={() => setCartHovered(true)}
					onMouseOut={() => setCartHovered(false)}
					onClick={() => setCartVisible(!isCartVisible)}
					className='duration-200 cursor-pointer'
				>
					{cartHovered ? (
						<svg
							width='22'
							height='20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
								fill='hsl(220, 13%, 13%)'
								fill-rule='nonzero'
							/>
						</svg>
					) : (
						<svg
							width='22'
							height='20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
								fill='#69707D'
								fill-rule='nonzero'
							/>
						</svg>
					)}
				</span>
				<span className='border-2 hover:border-orange rounded-full'>
					<Image
						src={require('../../../public/images/image-avatar.png')}
						alt='avatar'
						width={40}
					/>
				</span>
			</div>
		</nav>
	);
};

export default Navbar;
