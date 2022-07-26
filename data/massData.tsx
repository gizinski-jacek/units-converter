interface MassData {
	unit: string;
	symbol: string;
	conversion: { to: string; rate: number }[];
}

const massData: MassData[] = [
	{
		unit: 'kilogram',
		symbol: 'kg',
		conversion: [
			{ to: 'kg', rate: 1 },
			{ to: 't', rate: 0.001 },
			{ to: 'g', rate: 1000 },
			{ to: 'mg', rate: 1000000 },
			{ to: 'lbs', rate: 2.2046226218 },
			{ to: 'oz', rate: 35.2739619496 },
		],
	},
	{
		unit: 'tonne',
		symbol: 't',
		conversion: [
			{ to: 'kg', rate: 1000 },
			{ to: 't', rate: 1 },
			{ to: 'g', rate: 1000000 },
			{ to: 'mg', rate: 1000000000 },
			{ to: 'lbs', rate: 2204.6226218488 },
			{ to: 'oz', rate: 35273.96194958 },
		],
	},
	{
		unit: 'gram',
		symbol: 'g',
		conversion: [
			{ to: 'kg', rate: 0.001 },
			{ to: 't', rate: 1.0e-6 },
			{ to: 'g', rate: 1 },
			{ to: 'mg', rate: 1000 },
			{ to: 'lbs', rate: 0.0022046226 },
			{ to: 'oz', rate: 0.0352739619 },
		],
	},
	{
		unit: 'milligram',
		symbol: 'mg',
		conversion: [
			{ to: 'kg', rate: 1.0e-6 },
			{ to: 't', rate: 1.0e-9 },
			{ to: 'g', rate: 0.001 },
			{ to: 'mg', rate: 1 },
			{ to: 'lbs', rate: 2.2046226218488e-6 },
			{ to: 'oz', rate: 3.5274e-5 },
		],
	},
	{
		unit: 'pound',
		symbol: 'lbs',
		conversion: [
			{ to: 'kg', rate: 0.45359237 },
			{ to: 't', rate: 0.0004535924 },
			{ to: 'g', rate: 453.59237 },
			{ to: 'mg', rate: 453592.37 },
			{ to: 'lbs', rate: 1 },
			{ to: 'oz', rate: 16 },
		],
	},
	{
		unit: 'ounce',
		symbol: 'oz',
		conversion: [
			{ to: 'kg', rate: 0.0283495231 },
			{ to: 't', rate: 2.83495e-5 },
			{ to: 'g', rate: 28.349523125 },
			{ to: 'mg', rate: 28349.523125 },
			{ to: 'lbs', rate: 0.0625 },
			{ to: 'oz', rate: 1 },
		],
	},
];

export default massData;
