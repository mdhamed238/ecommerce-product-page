import './globals.css';
import { Kumbh_Sans as KumbhSans } from 'next/font/google';

const kumbhSans = KumbhSans({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
	title: 'E-commerce product page',
	description: 'A visually apealing design fro an e-commerce product page',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={kumbhSans.className}>{children}</body>
		</html>
	);
}
