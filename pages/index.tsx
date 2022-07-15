import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div className='col-9'>
			<Head>
				<title>Units Converter</title>
				<meta name='description' content='Units Converter' />
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>{'Use navigation ->'}</div>
		</div>
	);
};

export default Home;
