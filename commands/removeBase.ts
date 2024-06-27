import { EmbedBuilder, type Message, PermissionsBitField } from "discord.js";
import { currencyData } from "../currencyDataStore";
import { prisma } from "../prisma";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";
import { createErrorEmbed } from "../util/createErrorEmbed";

export const removeBase = async (message: Message, args: string[], mods) => {
	if (
		!message.member.permissions.has(PermissionsBitField.Flags.Administrator)
	) {
		commandResponseSendHelper(
			message,
			{
				embeds: [createErrorEmbed("No permissions")],
			},
			mods,
		);
	}

	await prisma.serverSettings.upsert({
		where: {
			id: message.guildId,
		},
		create: {
			id: message.guildId,
		},
		update: {},
	});

	const baseCurrency: string = args[2];
	if (!baseCurrency) {
		return commandResponseSendHelper(
			message,
			{
				embeds: [
					createErrorEmbed(
						"No currency specified. Try listCurrency for a list",
					),
				],
			},
			mods,
		);
	}

	if (!currencyData[baseCurrency]) {
		return commandResponseSendHelper(
			message,
			{
				embeds: [
					createErrorEmbed("Unsupported currency. Try listCurrency for a list"),
				],
			},
			mods,
		);
	}

	const baseCheck = await prisma.baseCurrency.findFirst({
		where: {
			AND: {
				serverId: message.guildId,
				currencyName: baseCurrency,
			},
		},
	});

	if (!baseCheck) {
		return commandResponseSendHelper(
			message,
			{ embeds: [createErrorEmbed("That currency is not set as a base.")] },
			mods,
		);
	}

	await prisma.baseCurrency.delete({
		where: {
			id: baseCheck.id
		},
	});

	return commandResponseSendHelper(
		message,
		{
			embeds: [
				new EmbedBuilder()
					.setTitle("Removed")
					.setDescription("Currency base removed."),
			],
		},
		mods,
	);
};
