import { EmbedBuilder, type Message } from "discord.js";
import { commands } from "./commandList";
import { commandResponseSendHelper } from "./util/commandResponseSendHelper";
import { createErrorEmbed } from "./util/createErrorEmbed";

const commandModifierArguments = {
	"--s": "silent",
	"--raw": "raw",
	"--noReply": "noReply",
	"--dm": "dm",
	"--blue": "blue",
};

const createBlankModifiers = () => {
	return {
		silent: false,
		raw: false,
		noReply: false,
		dm: false,
		blue: false,
	};
};

export type CommandModifiers = ReturnType<typeof createBlankModifiers>;

const createModifierList = (args: string[]) => {
	const blank = createBlankModifiers();
	for (let i = 0; i < args.length; i++) {
		for (const key in commandModifierArguments) {
			if (key === args[i]) {
				args.splice(i, 1);
				i--;
				blank[commandModifierArguments[key]] = true;
			}
		}
	}
	return blank;
};

export const commandManager = (message: Message) => {
	const args = message.content.split(" ");

	if (args[0] === "$:currency") {
		const mods = createModifierList(args);
		const commandName = args[1];
		if (!commandName) {
			commandResponseSendHelper(
				message,
				{
					embeds: [createErrorEmbed("No command name specified")],
				},
				mods,
			);
		} else {
			if (commands[commandName]) {
				commands[commandName](message, args, mods);
			} else {
				commandResponseSendHelper(
					message,
					{
						embeds: [createErrorEmbed("No command found")],
					},
					mods,
				);
			}
		}
		return true;
	}
};
