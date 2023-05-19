'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Navbar = dynamic(() => import('../components/Navbar'));
const Product = dynamic(() => import('../components/Product'));

export type Product = {
	id: number;
	name: string;
	price: number;
	quantity: number;
	images: Array<{
		id: number;
		src: string;
	}>;
};

export type State = {
	product: Product;
	currentProductImageId: number;
	cart: Product | null;
	isMobile: boolean;
	cartHovered: boolean;
	isCartVisible: boolean;
	isMobileNavVisible: boolean;
	isLightboxVisible: boolean;
};

export default function Home() {
	const [state, setState] = useState<State>({
		product: {
			id: 1,
			name: 'Fall Limited Edition Sneakers',
			price: 125,
			images: [
				{
					id: 1,
					src: 'image-product-1.jpg',
				},
				{
					id: 2,
					src: 'image-product-2.jpg',
				},
				{
					id: 3,
					src: 'image-product-3.jpg',
				},
				{
					id: 4,
					src: 'image-product-4.jpg',
				},
			],
			quantity: 0,
		},
		currentProductImageId: 1,
		cart: null,
		isMobile: false,
		cartHovered: false,
		isCartVisible: false,
		isMobileNavVisible: false,
		isLightboxVisible: false,
	});

	useEffect(() => {
		const checkMobile = () => {
			if (window.innerWidth <= 640) {
				setState({ ...state, isMobile: true });
			} else {
				setState({ ...state, isMobile: false });
			}
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	return (
		<main className='w-full h-screen overflow-x-hidden lg:px-28 bg-white'>
			<Navbar
				state={state}
				setState={setState}
			/>
			<Product
				state={state}
				setState={setState}
			/>
		</main>
	);
}
