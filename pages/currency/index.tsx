import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { useState } from 'react';
import { Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import { fetchExchangeRatesFromAPI } from '../../utils/fetchExchangeRatesFromAPI';
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

const Currency: NextPage = ({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [currencyData, setCurrencyData] = useState<AggregatedData[] | null>(
		data
	);
	const [inputValue, setInputValue] = useState(0);
	const [chosenCurrency, setChosenCurrency] = useState('EUR');
	const [searchValue, setSearchValue] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	const handleInputChange = (value: number) => {
		setInputValue(value);
	};

	const handleCurrencyChange = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const value = e.target.value;
		setChosenCurrency(value);
		setIsFetching(true);
		try {
			const data = await fetchExchangeRatesFromAPI(value);
			setCurrencyData(data);
			setIsFetching(false);
		} catch (error: any) {
			console.log(error);
		}
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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	try {
		const data: AggregatedData[] = await fetchExchangeRatesFromAPI('EUR');
		return {
			props: { data: data },
		};
	} catch (error) {
		return {
			props: { data: null },
		};
	}
};

export default Currency;
