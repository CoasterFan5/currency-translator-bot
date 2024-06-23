import { Embed, EmbedBuilder, type Message } from "discord.js";
import { commandResponseSendHelper } from "../commandResponseSendHelper";

const commands = {
	help: "This command!",
};
const modifiers = {
	"--s": "Silence a command output",
	"--raw": "No more embeds",
	"--noReply": "No more replies, just messages",
	"--dm": "Try and send a copy in dms, use --s to hide from this channel",
	"--blue": "Just send me the JSON object (dev option)",
};

export const help = (message: Message, mods) => {
	console.log("calling help");

	if (mods.raw) {
		let rep = "# Help\n## Commands:\n";
		for (const key in commands) {
			rep += `**${key}** - ${commands[key]}\n`;
		}
		rep += "## Modifiers\n";
		for (const key in modifiers) {
			rep += `**${key}** - ${modifiers[key]}\n`;
		}
		commandResponseSendHelper(message, rep, mods);
		return;
	}

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
