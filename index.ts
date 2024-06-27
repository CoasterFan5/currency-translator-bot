import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { commandManager } from "./commandHelper";
import { currencyData } from "./currencyDataStore";
import { getMatches } from "./currencyTranslator/needsTranslation";
import { getRateData } from "./getRateData";
import { prisma } from "./prisma";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

getRateData();

client.on("ready", (newClient) => {
	client.user.setActivity("$:currency help");
	console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async (message) => {
	if (commandManager(message)) {
		return;
	}

	if (!client.user || message.author.id === client.user?.id) {
		return;
	}

	//temporary channel limiter
	if (message.channelId !== "857116317119283240") {
		return;
	}

	//the magic?
	const messageContent = message.content.toLowerCase();

	const embed = new EmbedBuilder()
		.setTitle("Currency Context")
		.setColor("#3477eb")
		.setFooter({
			text: "Rates By Exchange Rate API"
		});
		

	let embedDescription = "Providing useful currency context\n";

	const messageMatches = getMatches(messageContent);
	if (messageMatches.length < 1) {
		return;
	}

	const serverConfig = await prisma.serverSettings.findFirst({
		where: {
			id: message.guildId,
		},
		include: {
			baseCurrencies: true,
		},
	});

	for (let i = 0; i < messageMatches.length; i++) {
		const match = messageMatches[i];
		if(Math.floor(match.value) === 420) {
			embed.setTitle("Currency Context <:weedemoji:1256027526963396628>")
		}
		if(Math.floor(match.value) === 69) {
			embed.setTitle("Currency Context (nice)")
		}
		const usdValue = match.value / currencyData[match.currency].value;
		const conversions: {
			value: number;
			currency: string;
		}[] = [];

		//convert into all the bases
		for (let j = 0; j < serverConfig.baseCurrencies.length; j++) {
			const baseCurrency = serverConfig.baseCurrencies[j];
			console.log(match.currency === baseCurrency.currencyName);
			if (match.currency !== baseCurrency.currencyName) {
				conversions.push({
					currency: baseCurrency.currencyName,
					value: usdValue * currencyData[baseCurrency.currencyName].value,
				});
			}
		}

		if (conversions.length > 0) {
			//already has been converted to usd, so we need to convert it back
			embedDescription += `${match.value} ${match.currency} is equal to: `;
		}
		for (let k = 0; k < conversions.length; k++) {
			const conversion = conversions[k];
			embedDescription += `\`${conversion.value.toFixed(2)} ${conversion.currency}\` `;
		}
		if (conversions.length > 0) {
			embedDescription += "\n";
		}
	}

	//just some special cases
	

	embed.setDescription(embedDescription);
	message.channel.send({
		embeds: [embed],
	});
});

client.login(process.env.TOKEN);
