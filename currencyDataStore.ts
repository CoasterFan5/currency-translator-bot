import { symbol } from "zod";

export const currencyData = {
	USD: {
		symbol: "$",
		value: 0,
		regex: /\$[0-9.]*/g,
	},
	GBP: {
		symbol: "£",
		value: 0,
		regex: /£[0-9.]*/g,
	},
	EUR: {
		symbol: "€",
		value: 0,
		regex: /€[0-9.]*|[0-9.]*€/g,
	},
	PLN: {
		symbol: "zł",
		value: 0,
		regex: /[0-9.]* zł/g,
	},
	JPY: {
		symbol: "¥",
		value: 0,
		regex: /¥[0-9.]*/g
	}
};
