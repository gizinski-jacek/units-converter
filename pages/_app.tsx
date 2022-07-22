import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Main.module.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<div className={styles.container}>
			<div className={`${styles.title} bg-dark p-2`}>
				<Link href='/'>Units Converter</Link>
			</div>
			<main className={`${styles.content} row`}>
				<div className='col-6'>
					<Component {...pageProps} />
				</div>
				<Navbar />
			</main>
			<Footer />
		</div>
	);
};

export default MyApp;
