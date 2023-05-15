import { classNames } from '@/utils';
import Image from 'next/image';

type Props = {
	links: Array<{
		id: number;
		name: string;
		path: string;
		isHovered: boolean;
	}>;
	isVisible?: boolean;
	onClose: () => void;
};

const MobileNavigation = ({ links, isVisible, onClose }: Props) => {
	return (
		<div
			className={classNames(
				'w-72 h-screen pl-8 pt-40 flex flex-col items-start gap-8 bg-white transition-all duration-300',
				isVisible ? 'fixed top-0 left-0 z-50' : 'hidden'
			)}
		>
			<button
				className='absolute top-8 left-8'
				onClick={onClose}
			>
				<Image
					src={require('../../../public/images/icon-close.svg')}
					alt='close'
				/>
			</button>
			{links.map((link) => (
				<a
					key={link.id}
					href={link.path}
					className='font-bold text-very-dark-blue'
				>
					{link.name}
				</a>
			))}
		</div>
	);
};

export default MobileNavigation;
