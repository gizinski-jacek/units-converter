import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import Caret from '../../reusables/Caret';
import ResetBtn from '../../reusables/ResetBtn';
import lengthData from '../../data/lengthData';
import styles from '../../styles/Length.module.scss';

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
		.find((item) => item.unit.toLowerCase() === chosenLength.toLowerCase())!
		.conversion.map((length) => {
			return (
				<tr key={length.to}>
					<td>{length.to}</td>
					<td>{(inputValue * length.rate).toString().slice(0, 12)}</td>
				</tr>
			);
		});

	return (
		<div className={styles.length}>
			<div className='mb-3'>
				<div className='input-group'>
					<select
						className='form-select'
						name='currency'
						id='currency'
						value={chosenLength}
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
					<div className='ms-1'>
						<Caret upwards={true} cta={handleIncrement} />
						<Caret upwards={false} cta={handleDecrement} />
					</div>
					<ResetBtn cta={handleInputClear} />
				</div>
			</div>
			<Table striped bordered hover>
				<thead className='table-primary'>
					<tr>
						<th scope='col-1'>Symbol</th>
						<th scope='col-2'>Value</th>
					</tr>
				</thead>
				<tbody>{tableDataRender}</tbody>
			</Table>
		</div>
	);
};

export default Length;
