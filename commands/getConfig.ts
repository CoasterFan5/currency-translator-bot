import { Prisma } from "@prisma/client";
import { EmbedBuilder, type Message } from "discord.js";
import { prisma } from "../prisma";
import { commandResponseSendHelper } from "../commandResponseSendHelper";

export const getConfig = async (message: Message, mods) => {
	const serverId = message.guildId

	const config = await prisma.serverSettings.findUnique({
		where: {
			id: serverId
		}
	})

	if(!config) {
		const embed = new EmbedBuilder().setTitle("Error").setDescription("No set config")
		commandResponseSendHelper(message, {
			embeds: [embed]
		}, mods)
	}
}