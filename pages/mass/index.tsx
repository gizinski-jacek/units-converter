import { NextPage } from 'next';
import { useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import massData from '../../data/massData';
import FormInput from '../../reusables/FormInput';

const Mass: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenMass, setChosenMass] = useState('kilogram');

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleMassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenMass(value);
	};

	const massListRender = massData.map((item) => {
		return (
			<option key={item.symbol} value={item.unit}>
				{item.symbol}
			</option>
		);
	});

	const tableDataRender = massData
		.find((item) => item.unit.toLowerCase() === chosenMass.toLowerCase())!
		.conversion.map((mass) => {
			return (
				<tr key={mass.to}>
					<td>{mass.to}</td>
					<td className='text-end'>
						{(inputValue * mass.rate).toString().slice(0, 12)}
					</td>
				</tr>
			);
		});

	return (
		<div>
			<div className='mb-3'>
				<InputGroup>
					<Form.Select
						name='mass'
						id='mass'
						value={chosenMass}
						onChange={(e) => handleMassChange(e)}
					>
						{massListRender}
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

export default Mass;
