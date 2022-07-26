import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import pagesLinksData from '../data/pagesLinksData';
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
				{pagesLinksData.map((item) => {
					return (
						<li
							key={item}
							className='list-group-item list-group-item-action list-group-item-action'
						>
							<Link href={`/${item.replace(' ', '-')}`}>{`${
								item.charAt(0).toUpperCase() + item.slice(1)
							} conversion`}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Home;
