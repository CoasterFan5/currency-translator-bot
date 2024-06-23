import z from "zod";
import { currencyData } from "./currencyDataStore";

const apiSchema = z.object({
	result: z.string(),
	provider: z.string(),
	rates: z.object({
		USD: z.number(),
		GBP: z.number(),
		EUR: z.number(),
		PLN: z.number(),
	}),
});

export const getRateData = async () => {
	const req = await fetch("https://open.er-api.com/v6/latest/USD");

	const bodyData = await req.json();

	const parsedBodyData = apiSchema.safeParse(bodyData);
	if (parsedBodyData.error) {
		throw console.error("Failed to get currency data");
	}

	for (const key in currencyData) {
		currencyData[key].value = parsedBodyData.data.rates[key];
	}

	console.log(currencyData);
};
