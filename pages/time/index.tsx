import { NextPage } from 'next';
import { useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import timeData from '../../data/timeData';
import FormInput from '../../reusables/FormInput';

const Time: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenTime, setChosenTime] = useState('hour');

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenTime(value);
	};

	const timeListRender = timeData.map((item) => {
		return (
			<option key={item.symbol} value={item.unit}>
				{item.symbol}
			</option>
		);
	});

	const tableDataRender = timeData
		.find((item) => item.unit.toLowerCase() === chosenTime.toLowerCase())!
		.conversion.map((time) => {
			return (
				<tr key={time.to}>
					<td>{time.to}</td>
					<td className='text-end'>
						{(inputValue * time.rate).toString().slice(0, 12)}
					</td>
				</tr>
			);
		});

	return (
		<div>
			<div className='mb-3'>
				<InputGroup>
					<Form.Select
						name='time'
						id='time'
						value={chosenTime}
						onChange={(e) => handleTimeChange(e)}
					>
						{timeListRender}
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

export default Time;
