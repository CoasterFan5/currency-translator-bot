import { type Message, MessageCreateOptions, MessagePayload } from "discord.js";
import type { CommandModifiers } from "./commandHelper";
import { addBase } from "./commands/addBase";
import { getConfig } from "./commands/getConfig";
import { help } from "./commands/help";
import { listCurrency } from "./commands/listCurrency";
import { setConfig } from "./commands/setConfig";
import { removeBase } from "./commands/removeBase";

export const commands: {
	[key: string]: (
		message: Message,
		args: string[],
		mods: CommandModifiers,
	) => unknown;
} = {
	help,
	getConfig,
	setConfig,
	addBase,
	listCurrency,
	removeBase,
};
