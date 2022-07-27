import { useEffect, useRef, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import ResetBtn from './ResetBtn';

interface Props {
	updateParent: (value: string) => void;
}

const SearchInput = ({ updateParent }: Props) => {
	const [searchValue, setSearchValue] = useState('');

	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		updateParent(searchValue);
	}, [searchValue, updateParent]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleSearchClear = () => {
		setSearchValue('');
		searchRef.current?.select();
	};

	return (
		<InputGroup>
			<Form.Control
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
		</InputGroup>
	);
};

export default SearchInput;
