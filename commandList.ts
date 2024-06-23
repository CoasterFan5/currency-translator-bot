import { Message, MessageCreateOptions, MessagePayload } from "discord.js";
import { help } from "./commands/help";

export const commands: {
	[key: string]: (message: Message) => string | MessagePayload | MessageCreateOptions
} = {
	help
}