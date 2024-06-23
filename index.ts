import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import 'dotenv/config'
import { getRateData } from "./getRateData";
import { currencyData } from "./currencyDataStore";

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

getRateData()

client.on("ready", () => {
	console.log(`Logged in as ${client.user?.tag}`)
})

client.on("messageCreate", (message) => {

	

	if(!client.user) {
		return;
	}

	//temporary channel limiter
	if(message.channelId != "1254237491406573669") {
		return;
	}

	if(message.author.id == client.user?.id) {
		return
	}

	//the magic?
	const messageContent = message.content.toLowerCase()
	
	for(const key in currencyData) {
		const match = messageContent.match(currencyData[key].regex)
		if(match && match[0]) {
			const matchString = match[0].toString()
			const valueStringArray = matchString.match(/[0-9][0-9]*/gm)
			if(!valueStringArray) {
				return
			}
			const value = parseInt(valueStringArray[0])
			if(isNaN(value)) {
				return
			}

			console.log(value)

			//convert back to usd
			if(key != "USD") {
				const newValue = (1/currencyData[key].value * value).toFixed(2);
				const embed = new EmbedBuilder()
					.setTitle("Currency Context")
					.setDescription(`Providing useful currency context\n${value} ${key} is equal to ${newValue} USD`)
					.setColor("#3477eb")
				message.channel.send({
					embeds: [
						embed
					],
				})
			}
		}
	}


	
});

console.log(process.env.TOKEN)
client.login(process.env.TOKEN)