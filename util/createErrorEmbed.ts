import { EmbedBuilder } from "discord.js";
import { Colors } from "./colors";

export const createErrorEmbed = (errorMessage: string) => {
	const embed = new EmbedBuilder();
	embed.setTitle("Error!");
	embed.setDescription(errorMessage);
	embed.setColor(Colors.Red);
	return embed;
};
