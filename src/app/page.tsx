import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../components/Navbar'));

export default function Home() {
	return (
		<main className='w-full h-screen overflow-x-hidden lg:px-32 bg-white'>
			<Navbar />
		</main>
	);
}
