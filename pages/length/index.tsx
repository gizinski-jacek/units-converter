import { NextPage } from 'next';
import { useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import lengthData from '../../data/lengthData';
import FormInput from '../../reusables/FormInput';

const Length: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenLength, setChosenLength] = useState('meter');

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenLength(value);
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
					<td className='text-end'>
						{(inputValue * length.rate).toString().slice(0, 12)}
					</td>
				</tr>
			);
		});

	return (
		<div>
			<div className='mb-3'>
				<InputGroup>
					<Form.Select
						name='length'
						id='length'
						value={chosenLength}
						onChange={(e) => handleLengthChange(e)}
					>
						{lengthListRender}
					</Form.Select>
					<FormInput updateParent={handleInputChange} />
				</InputGroup>
			</div>
			<Table striped bordered hover>
				<thead className='table-dark'>
					<tr>
						<th scope='col-1'>Symbol</th>
						<th scope='col-2' className='text-end'>
							Value
						</th>
					</tr>
				</thead>
				<tbody>{tableDataRender}</tbody>
			</Table>
		</div>
	);
};

export default Length;
