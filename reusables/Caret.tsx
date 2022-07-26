import { Button } from 'react-bootstrap';
import styles from '../styles/reusables/Caret.module.scss';

interface Props {
	upwards: Boolean;
	cta: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Caret = ({ upwards, cta }: Props) => {
	return (
		<Button
			variant='info'
			className={`${styles.caret} ${
				upwards ? styles.caret_up : styles.caret_down
			} rounded-0 border-dark`}
			onClick={(e) => cta(e)}
		></Button>
	);
};

export default Caret;
