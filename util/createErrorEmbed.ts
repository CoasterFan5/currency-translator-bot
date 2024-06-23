import { EmbedBuilder } from "discord.js";

export const createErrorEmbed = (errorMessage: string) => {
	const embed = new EmbedBuilder();
	embed.setTitle("Error!");
	embed.setDescription(errorMessage);
	embed.setColor("#ff0000");
	return embed;
};