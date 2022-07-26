import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Directory.module.scss';

const Directory = () => {
	const [directory, setDirectory] = useState<string[]>([]);

	const router = useRouter();
	const path = router.pathname;

	useEffect(() => {
		if (path === '/') {
			setDirectory([]);
		} else {
			const split = path.split('/');
			const paths = split.filter(Boolean);
			setDirectory(paths);
		}
	}, [path]);

	if (directory.length === 0) {
		return <div className={styles.directory}></div>;
	} else {
		return (
			<div className={styles.directory}>
				<div>
					<Link key='home' href='./'>
						Home
					</Link>
				</div>
				{directory.map((path) => (
					<div key={path}>
						<span>{' > '}</span>
						<Link href={path}>
							{path.charAt(0).toUpperCase() + path.slice(1)}
						</Link>
					</div>
				))}
			</div>
		);
	}
};

export default Directory;
