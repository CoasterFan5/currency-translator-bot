import { EmbedBuilder, type Message } from "discord.js";
import { Colors } from "../util/colors";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";

export const invite = (message: Message, args, mods) => {
	const embed = new EmbedBuilder();
	embed.setTitle("Bot invite");
	embed.setColor(Colors.Blue);
	embed.setDescription(
		"[Click me](https://discord.com/oauth2/authorize?client_id=931291922520219669&permissions=274878224448&integration_type=0&scope=bot)",
	);

	commandResponseSendHelper(
		message,
		{
			embeds: [embed],
		},
		mods,
	);
};
