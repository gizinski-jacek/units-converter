import { NextPage } from 'next';
import { useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import speedData from '../../data/speedData';
import FormInput from '../../reusables/FormInput';
import SearchInput from '../../reusables/SearchInput';

const Speed: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenSpeed, setChosenSpeed] = useState('km/h');
	const [searchValue, setSearchValue] = useState('');

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenSpeed(value);
	};

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
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
			if (searchValue) {
				if (
					speed.to.toLocaleLowerCase().includes(searchValue.toLowerCase()) ||
					speed.full.toLocaleLowerCase().includes(searchValue.toLowerCase())
				) {
					return (
						<tr key={speed.to}>
							<td>{speed.to}</td>
							<td className='text-end'>
								{(inputValue * speed.rate).toString().slice(0, 12)}
							</td>
						</tr>
					);
				}
			} else {
				return (
					<tr key={speed.to}>
						<td>{speed.to}</td>
						<td className='text-end'>
							{(inputValue * speed.rate).toString().slice(0, 12)}
						</td>
					</tr>
				);
			}
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
			<div className='mb-3'>
				<SearchInput updateParent={handleSearchChange} />
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
