import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.scss';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [exchangeRatesData, setExchangeRatesData] = useState();

	const fetchExchangeRates = async () => {
		try {
			const res = await fetch(
				`https://api.currencyscoop.com/v1/latest?api_key=${process.env.RATES_API}&base=USD`
			);
			const data = await res.json();
			const rates = data.response.rates;
			setExchangeRatesData(rates);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchExchangeRates();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<Link href='/'>Units Converter</Link>
			</div>
			<main className={`${styles.main} row`}>
				<Component {...pageProps} rates={exchangeRatesData} />
				<Navbar />
			</main>
			<Footer />
		</div>
	);
};

export default MyApp;
