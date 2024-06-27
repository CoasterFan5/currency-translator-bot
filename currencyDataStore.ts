export const currencyData = {
	USD: {
		symbol: "$",
		value: 0,
		regex: /\$[0-9.]*/gm,
	},
	GBP: {
		symbol: "£",
		value: 0,
		regex: /£[0-9.]*/gm,
	},
	EUR: {
		symbol: "€",
		value: 0,
		regex: /[0-9.]*€/gm,
	},
	PLN: {
		symbol: "zł",
		value: 0,
		regex: /[0-9.]* zł/gm,
	},
};
