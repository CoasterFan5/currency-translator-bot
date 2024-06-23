import { EmbedBuilder, type Message, PermissionsBitField } from "discord.js";
import { prisma } from "../prisma";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";
import { createErrorEmbed } from "../util/createErrorEmbed";

export const addBase = async (message: Message, args, mods) => {
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

	const baseCurrency = args[2];
	if (!baseCurrency) {
		commandResponseSendHelper(
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

	commandResponseSendHelper(
		message,
		{
			embeds: [createErrorEmbed("Command WIP")],
		},
		mods,
	);
};
