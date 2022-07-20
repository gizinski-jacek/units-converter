import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import Caret from '../../reusables/Caret';
import ResetBtn from '../../reusables/ResetBtn';
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

	const inputRef = useRef<HTMLInputElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

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

	const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setChosenCurrency(value);
	};

	const handleIncrement = () => {
		if (inputValue >= 999999) {
			setInputValue(999999);
		} else {
			setInputValue((prevState) => prevState + 0.01);
		}
	};

	const handleDecrement = () => {
		if (inputValue <= 0) {
			setInputValue(0);
		} else {
			setInputValue((prevState) => prevState - 0.01);
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

	const currencyListRender = currencyData?.map((currency) => {
		return (
			<option key={currency.code} value={currency.code}>
				{currency.code}
			</option>
		);
	});

	const tableCurrencyDataRender = currencyData?.map((item) => {
		if (searchValue) {
			if (
				item.code.toLowerCase().includes(searchValue.toLowerCase()) ||
				item.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
				item.countries
					.map((n) => n.toLowerCase())
					.includes(searchValue.toLowerCase())
			) {
				return (
					<tr key={item.code}>
						<td>{item.code}</td>
						<td className='text-end'>
							{Math.round(inputValue * item.exchangeRate * 100) / 100}
						</td>
						<td className='d-none d-md-table-cell'>{item.currency}</td>
						<td className='d-none d-lg-table-cell'>
							{item.countries.join(', ').replace(' (The)', '')}
						</td>
					</tr>
				);
			}
		} else {
			return (
				<tr key={item.code}>
					<td>{item.code}</td>
					<td className='text-end'>
						{Math.round(inputValue * item.exchangeRate * 100) / 100}
					</td>
					<td className='d-none d-md-table-cell'>{item.currency}</td>
					<td className='d-none d-lg-table-cell'>
						{item.countries.join(', ').replace(' (The)', '')}
					</td>
				</tr>
			);
		}
	});

	return (
		<div className={styles.currency}>
			<div className='mb-3'>
				<div className='input-group'>
					<select
						className='form-select'
						name='currency'
						id='currency'
						value={chosenCurrency}
						onChange={(e) => handleCurrencyChange(e)}
					>
						{currencyListRender}
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
			<div className='mb-3'>
				<div className='input-group'>
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
					<ResetBtn cta={handleSearchClear} />
				</div>
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
