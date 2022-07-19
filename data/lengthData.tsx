interface LengthData {
	unit: string;
	symbol: string;
	conversion: { to: string; rate: number }[];
}

const lengthData: LengthData[] = [
	{
		unit: 'meter',
		symbol: 'm',
		conversion: [
			{ to: 'km', rate: 0.001 },
			{ to: 'm', rate: 1 },
			{ to: 'dm', rate: 10 },
			{ to: 'cm', rate: 100 },
			{ to: 'mm', rate: 1000 },
			{ to: 'mi', rate: 0.000621371 },
			{ to: 'lea', rate: 0.0002071237 },
			{ to: 'yd', rate: 1.09361 },
			{ to: 'ft', rate: 3.28084 },
			{ to: 'in', rate: 39.3701 },
		],
	},
	{
		unit: 'kilometer',
		symbol: 'km',
		conversion: [
			{ to: 'km', rate: 1 },
			{ to: 'm', rate: 1000 },
			{ to: 'dm', rate: 10000 },
			{ to: 'cm', rate: 100000 },
			{ to: 'mm', rate: 1000000 },
			{ to: 'mi', rate: 0.621371 },
			{ to: 'lea', rate: 4.83 },
			{ to: 'yd', rate: 1093.61 },
			{ to: 'ft', rate: 3280.84 },
			{ to: 'in', rate: 39370.1 },
		],
	},
	{
		unit: 'decimeter',
		symbol: 'dm',
		conversion: [
			{ to: 'km', rate: 0.0001 },
			{ to: 'm', rate: 0.1 },
			{ to: 'dm', rate: 1 },
			{ to: 'cm', rate: 10 },
			{ to: 'mm', rate: 100 },
			{ to: 'mi', rate: 6.2137e-5 },
			{ to: 'lea', rate: 1.79871e-5 },
			{ to: 'yd', rate: 0.109361 },
			{ to: 'ft', rate: 0.328083 },
			{ to: 'in', rate: 3.936996 },
		],
	},
	{
		unit: 'centimeter',
		symbol: 'cm',
		conversion: [
			{ to: 'km', rate: 0.00001 },
			{ to: 'm', rate: 0.01 },
			{ to: 'dm', rate: 0.1 },
			{ to: 'cm', rate: 1 },
			{ to: 'mm', rate: 10 },
			{ to: 'mi', rate: 6.2137e-6 },
			{ to: 'lea', rate: 2.0712373074578e-6 },
			{ to: 'yd', rate: 0.0109361 },
			{ to: 'ft', rate: 0.0328084 },
			{ to: 'in', rate: 0.393701 },
		],
	},
	{
		unit: 'millimeter',
		symbol: 'mm',
		conversion: [
			{ to: 'km', rate: 1.0e-6 },
			{ to: 'm', rate: 0.001 },
			{ to: 'dm', rate: 0.01 },
			{ to: 'cm', rate: 0.1 },
			{ to: 'mm', rate: 1 },
			{ to: 'mi', rate: 6.2137119223733e-7 },
			{ to: 'lea', rate: 2.0712373074578e-7 },
			{ to: 'yd', rate: 0.0010936111996938 },
			{ to: 'ft', rate: 0.00328084 },
			{ to: 'in', rate: 0.0393701 },
		],
	},
	{
		unit: 'mile',
		symbol: 'mi',
		conversion: [
			{ to: 'km', rate: 1.60934 },
			{ to: 'm', rate: 1609.34 },
			{ to: 'dm', rate: 16093.4 },
			{ to: 'cm', rate: 160934 },
			{ to: 'mm', rate: 1.609e6 },
			{ to: 'mi', rate: 1 },
			{ to: 'lea', rate: 0.3333333333 },
			{ to: 'yd', rate: 1760 },
			{ to: 'ft', rate: 5280 },
			{ to: 'in', rate: 63360 },
		],
	},
	{
		unit: 'league',
		symbol: 'lea',
		conversion: [
			{ to: 'km', rate: 4.828032 },
			{ to: 'm', rate: 4828.032 },
			{ to: 'dm', rate: 48280.32 },
			{ to: 'cm', rate: 482803.2 },
			{ to: 'mm', rate: 4828032 },
			{ to: 'mi', rate: 3 },
			{ to: 'lea', rate: 1 },
			{ to: 'yd', rate: 5280 },
			{ to: 'ft', rate: 15840 },
			{ to: 'in', rate: 190080 },
		],
	},
	{
		unit: 'yard',
		symbol: 'yd',
		conversion: [
			{ to: 'km', rate: 0.0009144 },
			{ to: 'm', rate: 0.9144 },
			{ to: 'dm', rate: 9.144 },
			{ to: 'cm', rate: 91.44 },
			{ to: 'mm', rate: 914.4 },
			{ to: 'mi', rate: 0.0005681818 },
			{ to: 'lea', rate: 0.0001893939 },
			{ to: 'yd', rate: 1 },
			{ to: 'ft', rate: 3 },
			{ to: 'in', rate: 36 },
		],
	},
	{
		unit: 'foot',
		symbol: 'ft',
		conversion: [
			{ to: 'km', rate: 0.0003048 },
			{ to: 'm', rate: 0.3048 },
			{ to: 'dm', rate: 3.048 },
			{ to: 'cm', rate: 30.48 },
			{ to: 'mm', rate: 304.8 },
			{ to: 'mi', rate: 0.000189394 },
			{ to: 'lea', rate: 6.31313e-5 },
			{ to: 'yd', rate: 0.333333 },
			{ to: 'ft', rate: 1 },
			{ to: 'in', rate: 12 },
		],
	},
	{
		unit: 'inch',
		symbol: 'in',
		conversion: [
			{ to: 'km', rate: 2.54e-5 },
			{ to: 'm', rate: 0.0254 },
			{ to: 'dm', rate: 0.254 },
			{ to: 'cm', rate: 2.54 },
			{ to: 'mm', rate: 25.4 },
			{ to: 'mi', rate: 1.5783e-5 },
			{ to: 'lea', rate: 5.2609427609428e-6 },
			{ to: 'yd', rate: 0.0277778 },
			{ to: 'ft', rate: 0.0833333 },
			{ to: 'in', rate: 1 },
		],
	},
];

export default lengthData;