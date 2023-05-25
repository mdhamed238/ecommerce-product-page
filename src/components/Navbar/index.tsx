'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import BreadCrumb from './BreadCrumb';
import Cart from './Cart';
import MobileNavigation from './MobileNavigation';
import { State } from '@/app/page';

type Props = {
	state: State;
	setState: React.Dispatch<React.SetStateAction<State>>;
};

const Navbar = ({ state, setState }: Props) => {
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
		setState({ ...state, cart: null });
	};

	return (
		<nav className='px-6 pt-5 pb-5 lg:px-0 lg:pb-0 lg:pt-8 flex items-center justify-between border-b border-grayish-blue'>
			<MobileNavigation
				links={links}
				isVisible={state.isMobileNavVisible}
				onClose={() =>
					setState({ ...state, isMobileNavVisible: false })
				}
			/>
			<Cart
				onDelete={handleDelete}
				isVisible={state.isCartVisible}
				isMobile={state.isMobile}
				product={state.cart}
			/>
			<div className='flex items-start gap-14'>
				<div className='flex items-center gap-4'>
					<button
						className='lg:hidden'
						onClick={() =>
							setState({ ...state, isMobileNavVisible: true })
						}
					>
						<Image
							src={require('../../../public/images/icon-menu.svg')}
							alt='menu'
						/>
					</button>
					<Image
						src={require('../../../public/images/logo.svg')}
						alt='logo'
					/>
				</div>
				<div className='hidden lg:flex gap-8 items-center flex-1'>
					{links.map((link, index) => (
						<span className='h-14 w-14 hover:border-b-4 hover:border-b-orange flex justify-center'>
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
			</div>
			<div className='flex items-center gap-4 md:gap-10 lg:-translate-y-5'>
				<span
					onMouseOver={() =>
						setState({ ...state, cartHovered: true })
					}
					onMouseOut={() =>
						setState({ ...state, cartHovered: false })
					}
					onClick={() =>
						setState({
							...state,
							isCartVisible: !state.isCartVisible,
						})
					}
					className='relative duration-200 cursor-pointer'
				>
					{/* Count preview */}
					{state.cart?.quantity && (
						<span className='absolute -top-2 -right-2 bg-orange rounded-2xl text-white text-xs w-6 h-4 flex items-center justify-center font-bold'>
							{state.cart.quantity}
						</span>
					)}
					{/* Cart icon */}
					<svg
						width='22'
						height='20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
							fill={
								state.cartHovered
									? 'hsl(220, 13%, 13%)'
									: '#69707D'
							}
							fill-rule='nonzero'
						/>
					</svg>
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
