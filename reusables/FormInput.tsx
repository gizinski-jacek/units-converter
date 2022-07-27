import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Caret from './Caret';
import ResetBtn from './ResetBtn';

interface Props {
	updateParent: (value: number) => void;
}

const FormInput = ({ updateParent }: Props) => {
	const [inputValue, setInputValue] = useState(0);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		updateParent(inputValue);
	}, [inputValue, updateParent]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (value < 0) {
			setInputValue(0);
		} else if (value > 999999) {
			setInputValue(999999);
		} else {
			setInputValue(value);
		}
	};

	const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.shiftKey) {
			if (inputValue >= 999998) {
				setInputValue(999999);
			} else {
				setInputValue((prevState) => Math.round((prevState + 1) * 100) / 100);
			}
		} else if (inputValue >= 999999) {
			setInputValue(999999);
		} else {
			setInputValue((prevState) => Math.round((prevState + 0.01) * 100) / 100);
		}
	};

	const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.shiftKey) {
			if (inputValue <= 1) {
				setInputValue(0);
			} else {
				setInputValue((prevState) => Math.round((prevState - 1) * 100) / 100);
			}
		} else if (inputValue <= 0) {
			setInputValue(0);
		} else {
			setInputValue((prevState) => Math.round((prevState - 0.01) * 100) / 100);
		}
	};

	const handleInputClear = () => {
		setInputValue(0);
		inputRef.current?.select();
	};

	return (
		<>
			<Form.Control
				ref={inputRef}
				type='number'
				id='value'
				min={0}
				max={999999}
				step={0.01}
				value={Math.round(inputValue * 100) / 100}
				onChange={handleInputChange}
				placeholder='0.00'
			/>
			<div className='ms-1'>
				<Caret upwards={true} cta={handleIncrement} />
				<Caret upwards={false} cta={handleDecrement} />
			</div>
			<ResetBtn cta={handleInputClear} />
		</>
	);
};

export default FormInput;
