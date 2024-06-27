import { currencyData } from "../currencyDataStore";

export const getMatches = (str: string) => {
	const matches: {
		currency: string;
		value: number;
	}[] = [];

	for (const key in currencyData) {
		const matchList = str.match(currencyData[key].regex);
		if (matchList == null) {
			continue;
		}
		for (let i = 0; i < matchList.length; i++) {
			const match = matchList[i];
			const valueStringArray = match.match(/[0-9.]+/g);
			if (!valueStringArray) {
				continue;
			}
			const value = Number.parseFloat(valueStringArray[0]);
			if (Number.isNaN(value)) {
				continue;
			}
			matches.push({
				currency: key,
				value: value,
			});
		}
	}

	return matches;
};
