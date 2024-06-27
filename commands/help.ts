import { Embed, EmbedBuilder, type Message } from "discord.js";
import { commandResponseSendHelper } from "../util/commandResponseSendHelper";

const commands = {
	help: "This command!",
	getConfig: "Get the currency config",
	addBase: "Add a base currency",
	listCurrency: "List supported currency",
	removeBase: "Remove a base currency"
};
const modifiers = {
	"--s": "Silence a command output",
	"--raw": "No more embeds",
	"--noReply": "No more replies, just messages",
	"--dm": "Try and send a copy in dms, use --s to hide from this channel",
	"--blue": "Just send me the JSON object (dev option)",
};

export const help = (message: Message, args, mods) => {

	const embed = new EmbedBuilder()
		.setTitle("Help")
		.setDescription("General bot help");
	const commandEmbed = new EmbedBuilder().setTitle("Commands");
	for (const key in commands) {
		commandEmbed.addFields({
			name: key,
			value: commands[key],
		});
	}
	const modifiersEmbed = new EmbedBuilder().setTitle("Modifiers");
	for (const key in modifiers) {
		modifiersEmbed.addFields({
			name: key,
			value: modifiers[key],
		});
	}
	commandResponseSendHelper(
		message,
		{
			embeds: [embed, commandEmbed, modifiersEmbed],
		},
		mods,
	);
};
