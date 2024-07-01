# currency-translator-bot

A simple discord bot that provides context related to currencies within discord servers, attempting to help members gain a better understanding of someone's message despite difference in currency.  

## Getting started with development
The easiest and fastest way to get started with development is using the docker-compose file. However, there are some requirements before hand. 
1. Head over to [Discord's developer protal](https://discord.com/developers/applications) and get yourself a bot token for development. You will also need to invite this bot to a server with and give it appropriate permissions. 
2. Ensure you have docker installed
3. Install node modules and generate prisma schema 
```bash
npm i -g pnpm
pnpm install
npx prisma generate
```
Now, you can start the docker containers to begin development. 

```bash
docker-compose up
```
This will create the required database and also start the bot. 

## Support
Support is provided in my [official discord](https://discord.gg/GnqZQ4Wemd)
