import { NextPage } from 'next';
import { useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import dataStorageData from '../../data/dataStorageData';
import FormInput from '../../reusables/FormInput';

const DataStorage: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenStorage, setChosenStorage] = useState('bit');

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenStorage(value);
	};

	const storageListRender = dataStorageData.map((item) => {
		return (
			<option key={item.symbol} value={item.unit}>
				{item.symbol}
			</option>
		);
	});

	const tableDataRender = dataStorageData
		.find((item) => item.unit.toLowerCase() === chosenStorage.toLowerCase())!
		.conversion.map((storage) => {
			return (
				<tr key={storage.to}>
					<td>{storage.to}</td>
					<td className='text-end'>
						{(inputValue * storage.rate).toString().slice(0, 12)}
					</td>
				</tr>
			);
		});

	return (
		<div>
			<div className='mb-3'>
				<InputGroup>
					<Form.Select
						name='storage'
						id='storage'
						value={chosenStorage}
						onChange={(e) => handleStorageChange(e)}
					>
						{storageListRender}
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

export default DataStorage;
