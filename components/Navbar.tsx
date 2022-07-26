import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import pagesLinksData from '../data/pagesLinksData';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
	return (
		<Nav className={`${styles.nav} col-3 mx-3`}>
			{pagesLinksData.map((item) => {
				return (
					<Link key={item} href={`/${item}`}>
						{item}
					</Link>
				);
			})}
		</Nav>
	);
};

export default Navbar;
