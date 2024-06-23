import { type Message, MessageCreateOptions, MessagePayload } from "discord.js";
import type { CommandModifiers } from "./commandHelper";
import { help } from "./commands/help";
import { getConfig } from "./commands/getConfig";

export const commands: {
	[key: string]: (message: Message, mods: CommandModifiers) => void;
} = {
	help,
	getConfig,
};
