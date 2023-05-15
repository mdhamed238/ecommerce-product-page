import { State } from '@/app/page';
import { classNames } from '@/utils';
import Image from 'next/image';

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

	return (
		<div
			className={classNames(
				'absolute z-50 w-full h-screen grid place-items-center bg-black bg-opacity-75',
				state.isLightboxVisible ? '' : 'hidden'
			)}
			onClick={() => setState({ ...state, isLightboxVisible: false })}
		>
			<div
				className='flex flex-col gap-8 items-center'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='relative w-[450px]'>
					<button
						onClick={handlePreviousImage}
						className='bg-white w-10 h-10 flex items-center justify-center rounded-full absolute-center-v -left-5'
					>
						<Image
							alt='left'
							src={require('../../../public/images/icon-previous.svg')}
						/>
					</button>
					<Image
						alt=''
						src={require(`../../../public/images/${currentProductImage?.src}`)}
						className='xs:rounded-lg sm:rounded-xl'
					/>
					<button
						onClick={handleNextImage}
						className='bg-white w-10 h-10 flex items-center justify-center rounded-full absolute-center-v -right-5'
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
							<Image
								alt=''
								src={require(`../../../public/images/${image.src}`)}
								className={classNames(
									'rounded-lg',
									image.id === state.currentProductImageId
										? 'opacity-50'
										: 'hover:opacity-60 duration-200'
								)}
								width={70}
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Lighbox;
