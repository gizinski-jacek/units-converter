import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
	return (
		<Nav className={`${styles.nav} col-3 mx-3`}>
			<Link href='/currency'>Currency</Link>
			<Link href='/length'>Length</Link>
			<Link href='/temperature'>Temperature</Link>
		</Nav>
	);
};

export default Navbar;
