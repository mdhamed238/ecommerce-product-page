'use client';

import { classNames } from '@/utils';

type Props = {
	links: Array<{
		id: number;
		name: string;
		path: string;
		isHovered: boolean;
	}>;
	className?: string;
};

const BreadCrumb = ({ links, className }: Props) => {
	return (
		<div
			className={classNames(
				'hidden md:flex gap-2 items-center',
				className!
			)}
		>
			{links.map((link) => (
				<span
					className={classNames(
						'h-1 w-20',
						link.isHovered ? 'bg-orange' : 'bg-transparent'
					)}
				></span>
			))}
		</div>
	);
};

export default BreadCrumb;
