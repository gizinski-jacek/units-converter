// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cc from 'currency-codes';
import axios from 'axios';

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
			const apiRes = await axios.get(
				`${process.env.RATES_API_URI}?api_key=${process.env.RATES_API_KEY}&base=${req.body.currency}`
			);
			const ccData = cc.data;
			const rates: { [key: string]: number } = apiRes.data.response.rates;
			const filtered = [];
			for (const [key, value] of Object.entries(rates)) {
				const item = ccData.find((item) => item.code === key);
				if (item) {
					filtered.push({ ...item, exchangeRate: value });
				}
			}
			return res.status(200).json(filtered);
		} catch (error: any) {
			return res.status(404).json('Error, no rates data');
		}
	} else {
		return res.status(404).json('No endpoint here');
	}
}
