import { Prisma } from "@prisma/client";
import { EmbedBuilder, type Message } from "discord.js";
import { prisma } from "../prisma";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";

export const getConfig = async (message: Message, args, mods) => {
	const serverId = message.guildId;

	const config = await prisma.serverSettings.findUnique({
		where: {
			id: serverId,
		},
		include: {
			baseCurrencies: true,
		},
	});
	const embed = new EmbedBuilder()
		.setTitle("Config")
		.setDescription("Server Config");
	let baseCurrencyString = "";
	for (const [index, baseCurrency] of config.baseCurrencies.entries()) {
		baseCurrencyString += `${baseCurrency.currencyName}${index !== config.baseCurrencies.length - 1 ? ", " : ""}`;
	}
	embed.addFields({
		name: "Base Currencies",
		value: baseCurrencyString,
	});
	return commandResponseSendHelper(
		message,
		{
			embeds: [embed],
		},
		mods,
	);
};
