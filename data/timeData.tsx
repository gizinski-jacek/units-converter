interface TimeData {
	unit: string;
	symbol: string;
	conversion: { to: string; rate: number }[];
}

const timeData: TimeData[] = [
	{
		unit: 'hour',
		symbol: 'h',
		conversion: [
			{ to: 'h', rate: 1 },
			{ to: 'min', rate: 60 },
			{ to: 's', rate: 3600 },
			{ to: 'ms', rate: 3600000 },
			{ to: 'day', rate: 0.0416666667 },
			{ to: 'week', rate: 0.005952381 },
			{ to: 'month', rate: 0.001369863 },
			{ to: 'year', rate: 0.0001140771 },
		],
	},
	{
		unit: 'minute',
		symbol: 'min',
		conversion: [
			{ to: 'h', rate: 0.0166666667 },
			{ to: 'min', rate: 1 },
			{ to: 's', rate: 60 },
			{ to: 'ms', rate: 60000 },
			{ to: 'day', rate: 0.0006944444 },
			{ to: 'week', rate: 9.92063e-5 },
			{ to: 'month', rate: 2.28311e-5 },
			{ to: 'year', rate: 1.9012852688417e-6 },
		],
	},
	{
		unit: 'second',
		symbol: 's',
		conversion: [
			{ to: 'h', rate: 1 },
			{ to: 'min', rate: 0.0166666667 },
			{ to: 's', rate: 1 },
			{ to: 'ms', rate: 1000 },
			{ to: 'day', rate: 1.15741e-5 },
			{ to: 'week', rate: 1.6534391534392e-6 },
			{ to: 'month', rate: 3.8051750380518e-7 },
			{ to: 'year', rate: 3.1688087814029e-8 },
		],
	},
	{
		unit: 'millisecond',
		symbol: 'ms',
		conversion: [
			{ to: 'h', rate: 2.7777777777778e-7 },
			{ to: 'min', rate: 1.66667e-5 },
			{ to: 's', rate: 0.001 },
			{ to: 'ms', rate: 1 },
			{ to: 'day', rate: 1.1574074074074e-8 },
			{ to: 'week', rate: 1.6534391534392e-9 },
			{ to: 'month', rate: 3.8051750380518e-10 },
			{ to: 'year', rate: 3.1688087814029e-11 },
		],
	},
	{
		unit: 'day',
		symbol: 'd',
		conversion: [
			{ to: 'h', rate: 24 },
			{ to: 'min', rate: 1440 },
			{ to: 's', rate: 86400 },
			{ to: 'ms', rate: 86400000 },
			{ to: 'day', rate: 1 },
			{ to: 'week', rate: 0.1428571429 },
			{ to: 'month', rate: 0.0328767123 },
			{ to: 'year', rate: 0.0027378508 },
		],
	},
	{
		unit: 'week',
		symbol: 'week',
		conversion: [
			{ to: 'h', rate: 168 },
			{ to: 'min', rate: 10080 },
			{ to: 's', rate: 604800 },
			{ to: 'ms', rate: 604800000 },
			{ to: 'day', rate: 7 },
			{ to: 'week', rate: 1 },
			{ to: 'month', rate: 0.2301369863 },
			{ to: 'year', rate: 0.0191649555 },
		],
	},
	{
		unit: 'month',
		symbol: 'month',
		conversion: [
			{ to: 'h', rate: 730 },
			{ to: 'min', rate: 43800 },
			{ to: 's', rate: 2628000 },
			{ to: 'ms', rate: 2628000000 },
			{ to: 'day', rate: 30.4166666667 },
			{ to: 'week', rate: 4.3452380952 },
			{ to: 'month', rate: 1 },
			{ to: 'year', rate: 0.0832762948 },
		],
	},
	{
		unit: 'year',
		symbol: 'y',
		conversion: [
			{ to: 'h', rate: 8766 },
			{ to: 'min', rate: 525960 },
			{ to: 's', rate: 31557600 },
			{ to: 'ms', rate: 31557600000 },
			{ to: 'day', rate: 365.25 },
			{ to: 'week', rate: 52.1785714286 },
			{ to: 'month', rate: 12.0082191781 },
			{ to: 'year', rate: 1 },
		],
	},
];

export default timeData;
