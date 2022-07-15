import { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import styles from '../../styles/Currency.module.scss';
import cc from 'currency-codes';

interface Props {
	rates: { [key: string]: number };
}

const Currency: NextPage<Props> = ({ rates }) => {
	const [inputValue, setInputValue] = useState(0);
	const [searchValue, setSearchValue] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

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

	const handleIncrement = () => {
		if (inputValue >= 999999) {
			setInputValue(999999);
		} else {
			setInputValue((prevState) => prevState + 1);
		}
	};

	const handleDecrement = () => {
		if (inputValue <= 0) {
			setInputValue(0);
		} else {
			setInputValue((prevState) => prevState - 1);
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleInputClear = () => {
		setInputValue(0);
		inputRef.current?.select();
	};

	const handleSearchClear = () => {
		setSearchValue('');
		searchRef.current?.select();
	};

	const conversionsRender = () => {
		const render = [];
		for (const [key, value] of Object.entries(rates)) {
			const ccData = cc.code(key);
			if (ccData) {
				render.push(
					<tr key={key}>
						<td>{ccData.code}</td>
						<td>{Math.round(inputValue * value * 100) / 100}</td>
						<td className='d-none d-md-table-cell'>{ccData.currency}</td>
						<td className='d-none d-lg-table-cell'>
							{ccData.countries.join(', ').replace(' (The)', '')}
						</td>
					</tr>
				);
			}
		}
		return render;
	};

	return (
		<div className='col-5'>
			<div className={`${styles.controls} mb-3`}>
				<div className='input-group'>
					<label htmlFor='value'></label>
					<input
						className='form-control'
						ref={inputRef}
						type='number'
						id='value'
						min={0}
						max={999999}
						step={0.01}
						value={inputValue}
						onChange={handleInputChange}
					/>
					<div>
						<button
							type='button'
							className={styles.caret_up}
							onClick={handleIncrement}
						></button>
						<button
							type='button'
							className={styles.caret_down}
							onClick={handleDecrement}
						></button>
					</div>
					<button type='button' onClick={handleInputClear}>
						Clear
					</button>
				</div>
			</div>
			<div className='mb-3'>
				<div className='input-group'>
					<label htmlFor='value'></label>
					<input
						className='form-control'
						ref={searchRef}
						type='text'
						id='value'
						minLength={3}
						maxLength={32}
						placeholder='Search'
						value={searchValue}
						onChange={handleSearchChange}
					/>
					<button type='button' onClick={handleSearchClear}>
						Clear
					</button>
				</div>
			</div>
			<table className={`${styles.table} table table-striped`}>
				<thead className='table-primary'>
					<tr>
						<th scope='col-1'></th>
						<th scope='col-2'></th>
						<th scope='col-3' className='d-none d-md-table-cell'></th>
						<th scope='col-2' className='d-none d-lg-table-cell'></th>
					</tr>
				</thead>
				<tbody>{rates ? conversionsRender() : null}</tbody>
			</table>
		</div>
	);
};

export default Currency;
