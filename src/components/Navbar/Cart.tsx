import { classNames } from '@/utils';
import Image from 'next/image';

type Props = {
	products: Array<{
		id: number;
		name: string;
		price: number;
		image: string;
		quantity: number;
	}>;
	onDelete: (id: number) => void;
	isVisible?: boolean;
};

const Cart = ({ products, isVisible, onDelete }: Props) => {
	return (
		<div
			className={classNames(
				'w-[320px] h-auto rounded-lg shadow-xl  absolute top-24 -right-10 z-10 bg-white',
				isVisible ? '' : 'hidden'
			)}
		>
			<h3 className='p-4 text-sm font-bold text-very-dark-blue border-b border-grayish-blue'>
				Cart
			</h3>
			<div className='p-4'>
				{products.length === 0 ? (
					<h4 className='text-dark-grayish-blue text-sm font-semibold text-center py-10'>
						You cart is empty
					</h4>
				) : (
					<>
						<div className='flex flex-col justify-between w-full mb-6'>
							{products.map((product) => (
								<div
									className='flex justify-between mb-4 items-center'
									key={product.id}
								>
									<div className='flex gap-3'>
										<Image
											src={require(`../../../public/images/${product.image}`)}
											alt={product.name}
											className='object-contain rounded-md'
											width={36}
											height={36}
										/>
										<div className='flex flex-col justify-between'>
											<h4 className='text-sm text-dark-grayish-blue'>
												{product.name}
											</h4>
											<p className='text-sm text-dark-grayish-blue'>
												${product.price}.00 x{' '}
												{product.quantity}{' '}
												<span className='font-bold'>
													$
													{product.price *
														product.quantity}
												</span>
											</p>
										</div>
									</div>
									<button
										className='text-sm text-dark-grayish-blue hover:text-very-dark-blue duration-200'
										onClick={() => onDelete(product.id)}
									>
										<Image
											src={require('../../../public/images/icon-delete.svg')}
											alt='delete-icon'
										/>
									</button>
								</div>
							))}
						</div>
						<div className='w-full'>
							<button className='w-full py-2.5 text-white bg-orange rounded-lg hover:bg-opacity-60 hover:outline-none border-none'>
								Checkout
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
