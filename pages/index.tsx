import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Main.module.scss';

const Home: NextPage = () => {
	return (
		<div className={`${styles.home} col-9`}>
			<Head>
				<title>Units Converter</title>
				<meta name='description' content='Units Converter' />
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h4>Available conversions:</h4>
			<ul className='list-group my-3'>
				<li className='list-group-item list-group-item-action list-group-item-action list-group-item-warning'>
					<Link href='/currency'>Currency conversion</Link>
				</li>
				<li className='list-group-item list-group-item-action list-group-item-action list-group-item-success'>
					<Link href='/length'>Length conversion</Link>
				</li>
				<li className='list-group-item list-group-item-action list-group-item-action list-group-item-danger'>
					<Link href='/temperature'>Temperature conversion</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
