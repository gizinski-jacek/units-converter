import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import FormInput from '../../reusables/FormInput';

const Temperature: NextPage = () => {
	const [inputValue, setInputValue] = useState(0);
	const [chosenTemp, setChosenTemp] = useState('celsius');

	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleTempChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenTemp(value);
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
		<div>
			<div className='mb-3'>
				<InputGroup>
					<Form.Select
						name='temperature'
						id='temperature'
						value={chosenTemp}
						onChange={(e) => handleTempChange(e)}
					>
						<option value='celsius'>C</option>
						<option value='fahrenheit'>F</option>
						<option value='kelvin'>K</option>
					</Form.Select>
					<FormInput updateParent={handleInputChange} />
				</InputGroup>
			</div>
			<Table striped bordered hover>
				<thead className='table-dark'>
					<tr>
						<th scope='col-1'>Unit</th>
						<th scope='col-2' className='text-end'>
							Value
						</th>
					</tr>
				</thead>
				<tbody>{convertTempsAndRender(inputValue, chosenTemp)}</tbody>
			</Table>
		</div>
	);
};

export default Temperature;
