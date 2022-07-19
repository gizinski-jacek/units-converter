// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cc from 'currency-codes';

interface ResData {
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

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AggregatedData[] | string>
) {
	if (req.method === 'POST') {
		try {
			const apiRes = await fetch(
				`https://api.currencyscoop.com/v1/latest?api_key=${process.env.RATES_API}&base=${req.body.currency}`
			);
			const ccData = cc.data;
			const data = await apiRes.json();
			const rates: ResData = data.response.rates;
			const filtered = [];
			for (const [key, value] of Object.entries(rates)) {
				const item = ccData.find((item) => item.code === key);
				if (item) {
					filtered.push({ ...item, exchangeRate: value });
				}
			}
			res.status(200).json(filtered);
		} catch (error: any) {
			res.status(200).json('Error, no rates data');
		}
	} else {
		return res.status(404).json('No endpoint here');
	}
}
