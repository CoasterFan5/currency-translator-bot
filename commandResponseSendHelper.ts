import { Message, MessagePayload, MessageReplyOptions } from "discord.js";
import { CommandModifiers } from "./commandHelper";

export const commandResponseSendHelper = (originalMessage: Message, response: string | MessagePayload | MessageReplyOptions, mods: CommandModifiers) => {
	if(mods.blue) {
		response = "```json\n" + JSON.stringify(response) + "\n```"
	}
	if(mods.dm) {
		originalMessage.author.send(response)
	}
	if(!mods.silent) {
		if(mods.noReply) {
			originalMessage.channel.send(response)
		} else {
			originalMessage.reply(response)
		}
	}
}