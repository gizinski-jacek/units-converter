import { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import styles from '../../styles/Currency.module.scss';

interface Props {
	rates: { [key: string]: number };
}

const Currency: NextPage<Props> = ({ rates }) => {
	const [inputValue, setInputValue] = useState(0);

	const inputRef = useRef<HTMLInputElement>(null);

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

	const handleClear = () => {
		setInputValue(0);
		inputRef.current?.select();
	};

	const conversionsRender = () => {
		const render = [];
		for (const [key, value] of Object.entries(rates)) {
			render.push(
				<div className='col-3'>
					{key}: {(inputValue * value).toFixed(2)}
				</div>
			);
		}
		return render;
	};

	return (
		<div className='col-6'>
			<div>
				<div>
					<label htmlFor='value'></label>
					<input
						ref={inputRef}
						type='number'
						id='value'
						min={0}
						max={999999}
						value={inputValue}
						onChange={handleInputChange}
					/>
					<button type='button' onClick={handleClear}>
						Clear
					</button>
				</div>
			</div>
			<div className='row'>{rates ? conversionsRender() : null}</div>
		</div>
	);
};

export default Currency;
