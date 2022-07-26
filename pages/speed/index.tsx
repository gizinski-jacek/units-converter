import { NextPage } from 'next';
import { useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import speedData from '../../data/speedData';
import FormInput from '../../reusables/FormInput';

const Speed: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenSpeed, setChosenSpeed] = useState('km/h');

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenSpeed(value);
	};

	const speedListRender = speedData.map((item) => {
		return (
			<option key={item.symbol} value={item.symbol}>
				{item.symbol}
			</option>
		);
	});

	const tableDataRender = speedData
		.find((item) => item.symbol.toLowerCase() === chosenSpeed.toLowerCase())!
		.conversion.map((speed) => {
			return (
				<tr key={speed.to}>
					<td>{speed.to}</td>
					<td className='text-end'>
						{(inputValue * speed.rate).toString().slice(0, 12)}
					</td>
				</tr>
			);
		});

	return (
		<div>
			<div className='mb-3'>
				<InputGroup>
					<Form.Select
						name='speed'
						id='speed'
						value={chosenSpeed}
						onChange={(e) => handleSpeedChange(e)}
					>
						{speedListRender}
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

export default Speed;
