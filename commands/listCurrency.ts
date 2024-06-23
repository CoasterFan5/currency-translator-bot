import { EmbedBuilder, type Message } from "discord.js";
import { currencyData } from "../currencyDataStore";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";

export const listCurrency = (message: Message, args, mods) => {
	let desc = "";
	for (const currency in currencyData) {
		desc += `${currency}\n`;
	}

	const embed = new EmbedBuilder()
		.setTitle("Supported Currency List")
		.setDescription(desc);
	commandResponseSendHelper(
		message,
		{
			embeds: [embed],
		},
		mods,
	);
};
