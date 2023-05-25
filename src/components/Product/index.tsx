import { State } from '@/app/page';
import { classNames } from '@/utils';
import Image from 'next/image';
import Lighbox from '../Lighbox';

type Props = {
	state: State;
	setState: React.Dispatch<React.SetStateAction<State>>;
};

const Product = ({ state, setState }: Props) => {
	const currentProductImage = state.product?.images.find(
		(image) => image.id === state.currentProductImageId
	);

	const handleIncrement = () => {
		const qty = state.product?.quantity!;

		setState({
			...state,
			product: {
				...state.product,
				quantity: qty + 1,
			},
		});
	};

	const handleDecrement = () => {
		if (state.product?.quantity! > 0) {
			setState({
				...state,
				product: {
					...state.product,
					quantity: state.product?.quantity! - 1,
				},
			});
		}
	};

	const handleAddToCart = () => {
		if (state.product?.quantity! < 1) return;

		if (state.cart && state.product.id === state.cart?.id) {
			setState({
				...state,
				cart: {
					...state.cart,
					quantity: state.product.quantity,
				},
				product: {
					...state.product,
					quantity: 0,
				},
			});
			return;
		}
		setState({
			...state,
			cart: state.product,
			product: {
				...state.product,
				quantity: 0,
			},
		});
	};

	const handlePreviousImage = () => {
		const {
			currentProductImageId,
			product: { images },
		} = state;

		if (currentProductImageId === 1) {
			setState({
				...state,
				currentProductImageId: images.length,
			});
		} else {
			setState({
				...state,
				currentProductImageId: currentProductImageId - 1,
			});
		}
	};

	const handleNextImage = () => {
		const {
			currentProductImageId,
			product: { images },
		} = state;

		if (currentProductImageId === images.length) {
			setState({
				...state,
				currentProductImageId: images[0].id,
			});
		} else {
			setState({
				...state,
				currentProductImageId: currentProductImageId + 1,
			});
		}
	};

	return (
		<div className='xs:mt-12 mb-12 sm:px-2 md:px-4 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-24'>
			<Lighbox
				state={state}
				setState={setState}
				handlePreviousImage={handlePreviousImage}
				handleNextImage={handleNextImage}
			/>
			{/* Product Image */}
			<div className='xs:flex flex-col gap-6 items-center'>
				<div className='relative w-full max-w-[420px]'>
					<button
						onClick={handlePreviousImage}
						className='xs:hidden bg-white w-8 h-8 flex items-center justify-center rounded-full absolute-center-v left-2'
					>
						<Image
							alt='left'
							src={require('../../../public/images/icon-previous.svg')}
						/>
					</button>
					<Image
						alt=''
						src={require(`../../../public/images/${currentProductImage?.src}`)}
						className='xs:rounded-lg sm:rounded-xl cursor-pointer'
						onClick={() => {
							if (state.isMobile) return;
							setState({ ...state, isLightboxVisible: true });
						}}
					/>
					<button
						onClick={handleNextImage}
						className='xs:hidden bg-white w-8 h-8 flex items-center justify-center rounded-full absolute-center-v right-2'
					>
						<Image
							alt='right'
							src={require('../../../public/images/icon-next.svg')}
						/>
					</button>
				</div>
				{/* Other images */}
				<div className='hidden xs:flex gap-6'>
					{state.product?.images.map((image) => (
						<button
							key={image.id}
							onClick={() =>
								setState({
									...state,
									currentProductImageId: image.id,
								})
							}
						>
							<div
								className={classNames(
									'relative rounded-lg border-2 w-[70px]',
									image.id === state.currentProductImageId
										? 'border-orange'
										: 'border-transparent'
								)}
							>
								<Image
									alt=''
									src={require(`../../../public/images/${image.src}`)}
									className={classNames(
										'rounded-md object-fill w-full h-full',
										image.id === state.currentProductImageId
											? 'opacity-50 rounded-lg'
											: 'hover:opacity-60 duration-200'
									)}
								/>
								<div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-70'></div>
							</div>
						</button>
					))}
				</div>
			</div>
			{/* Product info */}
			<div className='flex flex-col items-start gap-5 max-w-sm px-4 sm:px-0'>
				<div className='flex flex-col items-start gap-4'>
					<h5 className='font-bold text-orange uppercase'>
						Sneaker Company
					</h5>
					<h1 className='font-bold text-3xl sm:text-4xl '>
						{state.product?.name}
					</h1>
				</div>
				<p className='mt-2 text-justify text-dark-grayish-blue break-before-all'>
					These low-profile sneakers are your perfect casual wear
					companion. Featuring a durable rubber outer sole, they’ll
					withstand everything the weather can offer.
				</p>
				<div className='w-full flex md:flex-col items-center md:items-start justify-between'>
					<div className='flex items-center gap-3'>
						<h1 className='text-3xl font-bold'>
							${state.product?.price}.00
						</h1>
						<span className='py-0.5 px-2.5 rounded-md bg-pale-orange text-orange font-bold'>
							50%
						</span>
					</div>
					<span className='line-through text-grayish-blue font-bold'>
						$250.00
					</span>
				</div>
				<div className='w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4'>
					<div className='bg-light-grayish-blue rounded-lg flex items-center justify-between px-4 sm:gap-10 py-3'>
						<button onClick={handleDecrement}>
							<Image
								src={require('../../../public/images/icon-minus.svg')}
								alt='minus'
								className='hover:opacity-60 duration-200'
							/>
						</button>
						<span className='font-bold'>
							{state.product?.quantity}
						</span>
						<button onClick={handleIncrement}>
							<Image
								src={require('../../../public/images/icon-plus.svg')}
								alt='plus'
								className='hover:opacity-60 duration-200'
							/>
						</button>
					</div>
					<button
						className='flex-1 bg-orange hover:opacity-60 text-white font-bold py-3 px-6 rounded-lg duration-200'
						onClick={handleAddToCart}
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
