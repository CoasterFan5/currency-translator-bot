import type { Message, MessagePayload, MessageReplyOptions } from "discord.js";
import type { CommandModifiers } from "./commandHelper";

export const commandResponseSendHelper = (
	originalMessage: Message,
	response: string | MessagePayload | MessageReplyOptions,
	mods: CommandModifiers,
) => {
	let newResponse: string | MessagePayload | MessageReplyOptions;
	if (mods.blue) {
		newResponse = `\`\`\`json\n${JSON.stringify(response)}\n\`\`\``;
	} else {
		newResponse = response;
	}
	if (mods.dm) {
		originalMessage.author.send(newResponse);
	}
	if (!mods.silent) {
		if (mods.noReply) {
			originalMessage.channel.send(newResponse);
		} else {
			originalMessage.reply(newResponse);
		}
	}
};
