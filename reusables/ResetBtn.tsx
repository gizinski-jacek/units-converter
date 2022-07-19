import styles from '../styles/reusables/ResetBtn.module.scss';

interface Props {
	cta: () => void;
}

const ResetBtn = ({ cta }: Props) => {
	return (
		<button
			type='reset'
			className={`${styles.reset} btn btn-danger rounded-0 border border-secondary border-1 m-1`}
			onClick={cta}
		></button>
	);
};

export default ResetBtn;
