export const fetchExchangeRatesFromAPI = async (currency: string) => {
	try {
		const res = await fetch(`http://localhost:3000/api/currencyRates`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ currency }),
		});
		const data = await res.json();
		return data;
	} catch (error: any) {
		console.log(error);
	}
};
