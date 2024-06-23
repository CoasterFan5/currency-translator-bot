import { type Message, MessageCreateOptions, MessagePayload } from "discord.js";
import type { CommandModifiers } from "./commandHelper";
import { help } from "./commands/help";
import { getConfig } from "./commands/getConfig";
import { setConfig } from "./commands/setConfig";
import { addBase } from "./commands/addBase";
import { listCurrency } from "./commands/listCurrency";

export const commands: {
	[key: string]: (message: Message, args: string[], mods: CommandModifiers) => void;
} = {
	help,
	getConfig,
	setConfig,
	addBase,
	listCurrency
};
