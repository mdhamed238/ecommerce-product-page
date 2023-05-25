'use client';
import { State } from '@/app/page';
import { classNames } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
	state: State;
	setState: React.Dispatch<React.SetStateAction<State>>;
	handlePreviousImage: () => void;
	handleNextImage: () => void;
};

const Lighbox = ({
	state,
	setState,
	handlePreviousImage,
	handleNextImage,
}: Props) => {
	const currentProductImage = state.product?.images.find(
		(image) => image.id === state.currentProductImageId
	);

	const [isCloseButtonHovered, setCloseButtonHovered] = useState(false);
	const [isNextBtnHovered, setNextButtonHovered] = useState(false);
	const [isPreviousBtnHovered, setPreviousButtonHovered] = useState(false);

	return (
		<div
			className={classNames(
				'absolute top-0 left-0 right-0 bottom-0 z-50 grid place-items-center bg-black bg-opacity-75',
				state.isLightboxVisible ? '' : 'hidden'
			)}
			onClick={() => setState({ ...state, isLightboxVisible: false })}
		>
			<div
				className='flex flex-col gap-8 items-center'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='relative w-[450px]'>
					{/* Close button */}
					<button
						className='absolute right-0 -top-6'
						onMouseOver={() => setCloseButtonHovered(true)}
						onMouseLeave={() => setCloseButtonHovered(false)}
						onClick={() =>
							setState({ ...state, isLightboxVisible: false })
						}
					>
						{isCloseButtonHovered ? (
							<svg
								width='14'
								height='15'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z'
									fill='hsl(26, 100%, 55%)'
									fill-rule='evenodd'
								/>
							</svg>
						) : (
							<svg
								width='14'
								height='15'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z'
									fill='hsl(0, 0%, 100%)'
									fill-rule='evenodd'
								/>
							</svg>
						)}
					</button>
					{/* Back button */}
					<button
						onClick={handlePreviousImage}
						className='bg-white w-10 h-10 flex items-center justify-center rounded-full absolute-center-v -left-5'
						onMouseOver={() => setPreviousButtonHovered(true)}
						onMouseOut={() => setPreviousButtonHovered(false)}
					>
						<svg
							width='12'
							height='18'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M11 1 3 9l8 8'
								stroke={
									isPreviousBtnHovered
										? 'hsl(26, 100%, 55%)'
										: '#1D2026'
								}
								stroke-width='3'
								fill='none'
								fill-rule='evenodd'
							/>
						</svg>
					</button>
					{/* Image */}
					<Image
						alt=''
						src={require(`../../../public/images/${currentProductImage?.src}`)}
						className='xs:rounded-lg sm:rounded-xl'
					/>
					{/* Next button */}
					<button
						onClick={handleNextImage}
						className='bg-white w-10 h-10 flex items-center justify-center rounded-full absolute-center-v -right-5'
						onMouseOver={() => setNextButtonHovered(true)}
						onMouseOut={() => setNextButtonHovered(false)}
					>
						<svg
							width='13'
							height='18'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='m2 1 8 8-8 8'
								stroke={
									isNextBtnHovered
										? 'hsl(26, 100%, 55%)'
										: '#1D2026'
								}
								stroke-width='3'
								fill='none'
								fill-rule='evenodd'
							/>
						</svg>
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
		</div>
	);
};

export default Lighbox;
