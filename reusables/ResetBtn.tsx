import { Button } from 'react-bootstrap';
import styles from '../styles/reusables/ResetBtn.module.scss';

interface Props {
	cta: () => void;
}

const ResetBtn = ({ cta }: Props) => {
	return (
		<Button
			variant='danger'
			className={`${styles.reset} rounded-0 border-dark m-1`}
			onClick={cta}
		></Button>
	);
};

export default ResetBtn;
