import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
	return (
		<nav className={`${styles.nav} col-2`}>
			<Link href='/currency'>Currency</Link>
			<Link href='/length'>Length</Link>
			<Link href='/temperature'>Temperature</Link>
		</nav>
	);
};

export default Navbar;
