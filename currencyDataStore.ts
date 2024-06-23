export let currencyData = {
	USD: {
		value: 0,
		regex: /\$[0-9.]*/gm
	},
	GBP: {
		value: 0,
		regex: /£[0-9.]*/gm,
	},
	EUR: {
		value: 0,
		regex: /[0-9.]*€/gm,
	},
	PLN: {
		value: 0,
		regex: /[0-9.]* zł/gm 
	}
}