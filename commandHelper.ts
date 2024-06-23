import { EmbedBuilder, Message } from "discord.js"
import { commands } from "./commandList";

const createErrorEmbed = (errorMessage: string) => {
	const embed = new EmbedBuilder();
	embed.setTitle("Error!")
	embed.setDescription(errorMessage)
	embed.setColor("#ff0000")
	return embed
}

const commandModifierArguments = {
	"--s": "silent",
	"--raw": "raw",
	"--noReply": "noReply",
	"--dm": "dm",
	"--blue": "blue"
}

const createBlankModifiers = () => {
	return {
		silent: false,
		raw: false,
		noReply: false,
		dm: false,
		blue: false,
	}
}

export type CommandModifiers = ReturnType<typeof createBlankModifiers>

const createModifierList = (args: string[]) => {
	const blank = createBlankModifiers()
	for(let i = 0; i < args.length; i++) {
		for(const key in commandModifierArguments) {
			if(key == args[i]) {
				blank[commandModifierArguments[key]] = true
			}
		}
	}
	console.log(blank)
	return blank;
}



 
export const commandManager = (message: Message) => {

	const args = message.content.split(" ")

	

	if(args[0] == "$:currency") {

		const mods = createModifierList(args)
		const commandName = args[1]
		if(!commandName) {

			if(!mods.silent) {
				if(mods.raw) {
					return message.reply("No command name specified")
				}
				message.reply({
					embeds: [
						createErrorEmbed("No command name specified")
					]
				})
			}
			
		} else {
			if(commands[commandName]) {
				console.log("running coma")
				console.log(!mods.silent)
				commands[commandName](message, mods)
				
			} else {
				if(!mods.silent) {
					if(mods.raw) {
						return message.reply("No command name specified")
					}
					message.reply({
						embeds: [
							createErrorEmbed("No command found")
						]
					})
				}
			}
		}
		return true
	}	
	
}