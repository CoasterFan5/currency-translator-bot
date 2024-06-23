import type { APIEmbed, Embed, EmbedBuilder, EmbedData, Message, MessageCreateOptions } from "discord.js";
import type { CommandModifiers } from "../commandHelper";

export const commandResponseSendHelper = (
	originalMessage: Message,
	response: {
		content?: string,
		embeds?: EmbedBuilder[]
	},
	mods: CommandModifiers,
) => {
	let newResponse: MessageCreateOptions | string;

	//auto convert from an embed if the response is raw
	if(mods.raw) {
		newResponse = ""
		if(response.content) {
			newResponse += `${response.content}\n`;
		}
		
		if(response.embeds) {
			for(const embed of response.embeds) {
				const embedData = embed.data;
				if(embedData.title) {
					newResponse += `# ${embedData.title}\n`
				}
				if(embedData.description) {
					newResponse += `${embedData.description}\n`
				}
				

				if(embedData.fields) {
					for(const field of embedData.fields) {
						if(field.name) {
							newResponse += `**${field.name}**\n`
						}
						if(field.value) {
							newResponse += `${field.value}\n`
						}
					}
				}
				
			}
			
			
		}
		
		
	} else {
		newResponse = response;
	}

	if (mods.blue) {
		newResponse = `\`\`\`json\n${JSON.stringify(newResponse)}\n\`\`\``;
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
