import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.scss';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<Link href='/'>Units Converter</Link>
			</div>
			<main className={`${styles.main} row`}>
				<div className='col-5 mx-5'>
					<Component {...pageProps} />
				</div>
				<Navbar />
			</main>
			<Footer />
		</div>
	);
};

export default MyApp;
