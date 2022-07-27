import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import FormInput from '../../reusables/FormInput';
import SearchInput from '../../reusables/SearchInput';
import styles from '../../styles/Currency.module.scss';

interface AggregatedData {
	code: string;
	countries: string[];
	currency: string;
	digits: number;
	exchangeRate: number;
	number: string;
}

const Currency: NextPage = () => {
	const [currencyData, setCurrencyData] = useState<AggregatedData[]>([]);
	const [inputValue, setInputValue] = useState(0);
	const [chosenCurrency, setChosenCurrency] = useState('EUR');
	const [searchValue, setSearchValue] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	const fetchExchangeRatesFromAPI = async (currency: string) => {
		try {
			const res = await fetch(`/api/currencyRates`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ currency }),
			});
			const data = await res.json();
			setCurrencyData(data);
			setIsFetching(false);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		setIsFetching(true);
		fetchExchangeRatesFromAPI(chosenCurrency);
	}, [chosenCurrency]);

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenCurrency(value);
	};

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
	};

	const currencyListRender = currencyData?.map((currency) => {
		return (
			<option key={currency.code} value={currency.code}>
				{currency.code}
			</option>
		);
	});

	const tableCurrencyDataRender = currencyData?.map((cur) => {
		if (searchValue) {
			if (
				cur.code.toLowerCase().includes(searchValue.toLowerCase()) ||
				cur.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
				cur.countries
					.map((n) => n.toLowerCase())
					.includes(searchValue.toLowerCase())
			) {
				return (
					<tr key={cur.code}>
						<td>{cur.code}</td>
						<td className='text-end'>
							{Math.round(inputValue * cur.exchangeRate * 100) / 100}
						</td>
						<td className='d-none d-md-table-cell'>{cur.currency}</td>
						<td className='d-none d-lg-table-cell'>
							{cur.countries.join(', ').replace(' (The)', '')}
						</td>
					</tr>
				);
			}
		} else {
			return (
				<tr key={cur.code}>
					<td>{cur.code}</td>
					<td className='text-end'>
						{Math.round(inputValue * cur.exchangeRate * 100) / 100}
					</td>
					<td className='d-none d-md-table-cell'>{cur.currency}</td>
					<td className='d-none d-lg-table-cell'>
						{cur.countries.join(', ').replace(' (The)', '')}
					</td>
				</tr>
			);
		}
	});

	return (
		<div className={styles.currency}>
			<div className='mb-3'>
				<InputGroup>
					<Form.Select
						name='currency'
						id='currency'
						value={chosenCurrency}
						onChange={(e) => handleCurrencyChange(e)}
					>
						{currencyListRender}
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
						<th scope='col-1'></th>
						<th scope='col-2' className='text-end'>
							{isFetching ? (
								<Spinner
									animation='border'
									variant='info'
									role='status'
									size='sm'
								>
									<span className='visually-hidden'>Loading...</span>
								</Spinner>
							) : null}
						</th>
						<th scope='col-3' className='d-none d-md-table-cell'></th>
						<th scope='col-4' className='d-none d-lg-table-cell'></th>
					</tr>
				</thead>
				<tbody>{tableCurrencyDataRender}</tbody>
			</Table>
		</div>
	);
};

export default Currency;
