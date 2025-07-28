import z from "zod";
import { currencyData } from "./currencyDataStore";

const apiSchema = z.object({
	USD: z.number(),
	GBP: z.number(),
	EUR: z.number(),
	PLN: z.number(),
	JPY: z.number(),
});

export const getRateData = async () => {
	console.log("Fetching rate data");

	const req = await fetch("https://currency.penylo.dev/rates/USD/");

	const bodyData = await req.json();

	const parsedBodyData = apiSchema.safeParse(bodyData);
	if (parsedBodyData.error) {
		throw console.error("Failed to get currency data");
	}

	for (const key in currencyData) {
		currencyData[key].value = parsedBodyData.data[key];
	}
	console.log("Rate data fetched");
};
