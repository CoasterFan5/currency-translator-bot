import { Message, MessageCreateOptions, MessagePayload } from "discord.js";
import { help } from "./commands/help";
import { CommandModifiers } from "./commandHelper";

export const commands: {
	[key: string]: (message: Message, mods: CommandModifiers) => void
} = {
	help
}