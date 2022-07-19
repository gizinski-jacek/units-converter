import { NextPage } from 'next';
import { useRef, useState } from 'react';
import Caret from '../../reusables/Caret';
import ResetBtn from '../../reusables/ResetBtn';
import styles from '../../styles/Temperature.module.scss';

const Temperature: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenTemp, setChosenTemp] = useState('celsius');

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
		setChosenTemp(value);
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

	const convertTempsAndRender = (value: number, fromTemp: string) => {
		switch (fromTemp) {
			case 'celsius':
				const cToF = Math.round((value * (9 / 5) + 32) * 100) / 100;
				const cToK = Math.round((value + 273.15) * 100) / 100;
				return (
					<>
						<tr>
							<td>Celsius</td>
							<td className='text-end'>{value}°C</td>
						</tr>
						<tr>
							<td>Fahrenheit</td>
							<td className='text-end'>{cToF}°F</td>
						</tr>
						<tr>
							<td>Kelvin</td>
							<td className='text-end'>{cToK}K</td>
						</tr>
					</>
				);
			case 'fahrenheit':
				const fToC = Math.round((value - 32) * (5 / 9) * 100) / 100;
				const fToK =
					Math.round(((value - 32) * (5 / 9) + 273.15) * 1000) / 1000;
				return (
					<>
						<tr>
							<td>Celsius</td>
							<td className='text-end'>{fToC}°C</td>
						</tr>
						<tr>
							<td>Fahrenheit</td>
							<td className='text-end'>{value}°F</td>
						</tr>
						<tr>
							<td>Kelvin</td>
							<td className='text-end'>{fToK}K</td>
						</tr>
					</>
				);
			case 'kelvin':
				const kToC = Math.round((value - 273.15) * 100) / 100;
				const kToF = Math.round(((value - 273.15) * (9 / 5) + 32) * 100) / 100;
				return (
					<>
						<tr>
							<td>Celsius</td>
							<td className='text-end'>{kToC}°C</td>
						</tr>
						<tr>
							<td>Fahrenheit</td>
							<td className='text-end'>{kToF}°F</td>
						</tr>
						<tr>
							<td>Kelvin</td>
							<td className='text-end'>{value}K</td>
						</tr>
					</>
				);
			default:
				return;
		}
	};

	return (
		<>
			<div className='mb-3'>
				<div className='input-group'>
					<select
						className={`${styles.select} form-select`}
						name='currency'
						id='currency'
						value={chosenTemp}
						onChange={(e) => handleLengthChange(e)}
					>
						<option value='celsius'>C</option>
						<option value='fahrenheit'>F</option>
						<option value='kelvin'>K</option>
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
					<div className='ms-1'>
						<Caret up={true} cta={handleIncrement} />
						<Caret up={false} cta={handleDecrement} />
					</div>
					<ResetBtn cta={handleInputClear} />
				</div>
			</div>
			<table className={`${styles.table} table table-striped`}>
				<thead className='table-primary'>
					<tr>
						<th scope='col-1'>Unit</th>
						<th scope='col-2' className='text-end'>
							Value
						</th>
					</tr>
				</thead>
				<tbody>{convertTempsAndRender(inputValue, chosenTemp)}</tbody>
			</table>
		</>
	);
};

export default Temperature;
