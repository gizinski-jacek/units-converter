import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Currency.module.scss';
import cc from 'currency-codes';

interface ResponseData {
	[key: string]: number;
}

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
	const [chosenCurrency, setChosenCurrency] = useState('USD');
	const [searchValue, setSearchValue] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	const aggregateData = (data: ResponseData) => {
		const ccData = cc.data;
		const filtered = [];
		for (const [key, value] of Object.entries(data)) {
			const item = ccData.find((item) => item.code === key);
			if (item) {
				filtered.push({ ...item, exchangeRate: value });
			}
		}
		return filtered;
	};

	const fetchExchangeRatesFromAPI = async (currency: string) => {
		try {
			const res = await fetch(
				`https://api.currencyscoop.com/v1/latest?api_key=${process.env.RATES_API}&base=${currency}`
			);
			const data = await res.json();
			const rates = data.response.rates;
			return rates;
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		(async () => {
			const rates = await fetchExchangeRatesFromAPI(chosenCurrency);
			if (rates) {
				const aggregate = aggregateData(rates);
				setCurrencyData(aggregate);
			} else {
				console.log('No Rates Data');
			}
		})();
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

	const currencyListRender = currencyData.map((c) => {
		return (
			<option key={c.code} value={c.code}>
				{c.code}
			</option>
		);
	});

	const tableCurrencyDataRender = currencyData.map((c) => {
		if (searchValue) {
			if (
				c.code.toLowerCase().includes(searchValue.toLowerCase()) ||
				c.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
				c.countries
					.map((n) => n.toLowerCase())
					.includes(searchValue.toLowerCase())
			) {
				return (
					<tr key={c.code}>
						<td>{c.code}</td>
						<td>{Math.round(inputValue * c.exchangeRate * 100) / 100}</td>
						<td className='d-none d-md-table-cell'>{c.currency}</td>
						<td className='d-none d-lg-table-cell'>
							{c.countries.join(', ').replace(' (The)', '')}
						</td>
					</tr>
				);
			}
		} else {
			return (
				<tr key={c.code}>
					<td>{c.code}</td>
					<td>{Math.round(inputValue * c.exchangeRate * 100) / 100}</td>
					<td className='d-none d-md-table-cell'>{c.currency}</td>
					<td className='d-none d-lg-table-cell'>
						{c.countries.join(', ').replace(' (The)', '')}
					</td>
				</tr>
			);
		}
	});

	return (
		<div className='col-5'>
			<div className='mb-3'>
				<div className='input-group'>
					<label htmlFor='value'></label>
					<select
						className={`${styles.select} form-select`}
						name='currency'
						id='currency'
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
					<div className='mx-1'>
						<button
							type='button'
							className={`${styles.caret_up} rounded-0 border border-dark border-1`}
							onClick={handleIncrement}
						></button>
						<button
							type='button'
							className={`${styles.caret_down} rounded-0 border border-dark border-1`}
							onClick={handleDecrement}
						></button>
					</div>
					<button
						type='reset'
						className={`${styles.reset} btn btn-danger rounded-0 border border-secondary border-1`}
						onClick={handleInputClear}
					></button>
				</div>
			</div>
			<div className='mb-3'>
				<div className='input-group'>
					<label htmlFor='value'></label>
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
					<button
						type='reset'
						className={`${styles.reset} btn btn-danger rounded-0 border border-secondary border-1 ms-1`}
						onClick={handleSearchClear}
					></button>
				</div>
			</div>
			<table className={`${styles.table} table table-striped`}>
				<thead className='table-primary'>
					<tr>
						<th scope='col-1'></th>
						<th scope='col-2'></th>
						<th scope='col-3' className='d-none d-md-table-cell'></th>
						<th scope='col-2' className='d-none d-lg-table-cell'></th>
					</tr>
				</thead>
				<tbody>{tableCurrencyDataRender}</tbody>
			</table>
		</div>
	);
};

export default Currency;
