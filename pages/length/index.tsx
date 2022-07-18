import { NextPage } from 'next';
import { useRef, useState } from 'react';
import styles from '../../styles/Length.module.scss';
import lengthData from '../../data/lengthData';

const Length: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenLength, setChosenLength] = useState('meter');

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

	const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenLength(value);
	};

	const handleIncrement = () => {
		if (inputValue >= 999999) {
			setInputValue(999999);
		} else {
			setInputValue((prevState) => Math.round((prevState + 0.01) * 100) / 100);
		}
	};

	const handleDecrement = () => {
		if (inputValue <= 0) {
			setInputValue(0);
		} else {
			setInputValue((prevState) => Math.round((prevState - 0.01) * 100) / 100);
		}
	};

	const handleInputClear = () => {
		setInputValue(0);
		inputRef.current?.select();
	};

	const lengthListRender = lengthData.map((item) => {
		return (
			<option key={item.symbol} value={item.unit}>
				{item.symbol}
			</option>
		);
	});

	const tableDataRender = lengthData
		.find((x) => x.unit.toLowerCase() === chosenLength.toLowerCase())!
		.conversion.map((l) => {
			return (
				<tr key={l.to}>
					<td>{l.to}</td>
					<td>{(inputValue * l.rate).toString().slice(0, 12)}</td>
				</tr>
			);
		});

	return (
		<div className='col-5'>
			<div className='mb-3'>
				<div className='input-group'>
					<label htmlFor='value'></label>
					<select
						className={`${styles.select} form-select`}
						name='currency'
						id='currency'
						onChange={(e) => handleLengthChange(e)}
					>
						{lengthListRender}
					</select>
					<input
						className='form-control'
						ref={inputRef}
						type='number'
						id='value'
						min={0}
						max={999999}
						step={0.01}
						value={Math.round(inputValue * 100) / 100}
						onChange={handleInputChange}
					/>
					<div className='mx-1'>
						<button
							type='button'
							className={`${styles.caret_up} rounded-0 border border-dark border-1`}
							onClick={handleIncrement}
						></button>
						<button
							type='button'
							className={`${styles.caret_down} rounded-0 border border-dark border-1`}
							onClick={handleDecrement}
						></button>
					</div>
					<button
						type='reset'
						className={`${styles.reset} btn btn-danger rounded-0 border border-secondary border-1`}
						onClick={handleInputClear}
					></button>
				</div>
			</div>
			<table className={`${styles.table} table table-striped`}>
				<thead className='table-primary'>
					<tr>
						<th scope='col-1'>Symbol</th>
						<th scope='col-2'>Value</th>
					</tr>
				</thead>
				<tbody>{tableDataRender}</tbody>
			</table>
		</div>
	);
};

export default Length;
