import { EmbedBuilder, type Message, PermissionsBitField } from "discord.js";
import { prisma } from "../prisma";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";
import { createErrorEmbed } from "../util/createErrorEmbed";
import { currencyData } from "../currencyDataStore";

export const addBase = async (message: Message, args: string[], mods) => {
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

	if(!currencyData[baseCurrency]) {
		return commandResponseSendHelper(
			message,
			{
				embeds: [
					createErrorEmbed(
						"Unsupported currency. Try listCurrency for a list",
					),
				],
			},
			mods,
		);
	}

	const baseCheck = await prisma.baseCurrency.findFirst({
		where: {
			AND: {
				serverId: message.guildId,
				currencyName: baseCurrency
			}
		}
	})

	if(baseCheck) {
		return commandResponseSendHelper(message, {embeds: [createErrorEmbed("Currency base already specified")]}, mods)
	}

	await prisma.baseCurrency.create({
		data: {
			serverId: message.guildId,
			currencyName: baseCurrency
		}
	})

	return commandResponseSendHelper(
		message,
		{
			embeds: [new EmbedBuilder().setTitle("Created").setDescription("Currency Created")],
		},
		mods,
	);
};
