import { EmbedBuilder, Message } from "discord.js";

export const help = (message: Message) => {
	return {
		embeds: [
			new EmbedBuilder().setTitle("Commands").setDescription("List of commands").addFields({
				name: "help",
				value: "Thats this",
			})
		]
	}
}