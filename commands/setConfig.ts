import { EmbedBuilder, type Message, PermissionsBitField } from "discord.js";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";
import { createErrorEmbed } from "../util/createErrorEmbed";

export const setConfig = async (message: Message, args, mods) => {
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

	commandResponseSendHelper(
		message,
		{
			embeds: [createErrorEmbed("Command WIP")],
		},
		mods,
	);
};
