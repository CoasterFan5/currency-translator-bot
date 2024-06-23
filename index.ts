import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { commandManager } from "./commandHelper";
import { currencyData } from "./currencyDataStore";
import { getRateData } from "./getRateData";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

getRateData();

client.on("ready", () => {
	console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", (message) => {
	if (commandManager(message)) {
		return;
	}

	if (!client.user) {
		return;
	}

	//temporary channel limiter
	if (message.channelId !== "857116317119283240") {
		return;
	}

	if (message.author.id === client.user?.id) {
		return;
	}

	//the magic?
	const messageContent = message.content.toLowerCase();

	const embed = new EmbedBuilder()
		.setTitle("Currency Context")
		.setDescription("Providing useful currency context\n")
		.setColor("#3477eb");

	let embedDescription = "Providing useful currency context\n";
	let sendEmbed = false;

	for (const key in currencyData) {
		const match = messageContent.match(currencyData[key].regex);
		if (match?.[0]) {
			const matchString = match[0].toString();
			const valueStringArray = matchString.match(/[0-9][0-9.]*/gm);
			if (!valueStringArray) {
				return;
			}
			const value = Number.parseFloat(valueStringArray[0]);
			if (Number.isNaN(value)) {
				return;
			}

			console.log(value);

			//convert back to usd
			if (key !== "USD") {
				const newValue = ((1 / currencyData[key].value) * value).toFixed(2);
				embedDescription += `${value} ${key} is equal to ${newValue} USD\n`;
				sendEmbed = true;
			}
		}
	}
	if (sendEmbed) {
		embed.setDescription(embedDescription);
		message.channel.send({
			embeds: [embed],
		});
	}
});

client.login(process.env.TOKEN);
