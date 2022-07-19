import styles from '../styles/reusables/Caret.module.scss';

interface Props {
	upwards: Boolean;
	cta: () => void;
}

const Caret = ({ upwards, cta }: Props) => {
	return (
		<button
			type='button'
			className={`${styles.caret} ${
				upwards ? styles.caret_up : styles.caret_down
			} rounded-0 border border-dark border-1`}
			onClick={cta}
		></button>
	);
};

export default Caret;
