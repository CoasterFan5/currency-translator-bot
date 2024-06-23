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
	"--s": "silent"
}

const createBlankModifiers = () => {
	return {
		silent: false
	}
}

const createModifierList = (args: string[]) => {
	const blank = createBlankModifiers()
	for(let i = 0; i < args.length; i++) {
		for(const key in commandModifierArguments) {
			if(args[i] == key) {
				console.log("setting " + key)
				blank[key] == true
			}
		}
	}
	return blank;
}



 
export const commandManager = (message: Message) => {

	const args = message.content.split(" ")

	

	if(args[0] == "$:currency") {

		const mods = createModifierList(args)
		const commandName = args[1]
		if(!commandName) {

			if(!mods.silent) {
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
				const output = commands[commandName](message)
				if(!mods.silent) {
					message.channel.send(output)
				}
				
			} else {
				if(!mods.silent) {
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