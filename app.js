const { Client, GatewayIntentBits, IntentsBitField } = require('discord.js');
require('dotenv').config();

const myIntents = new IntentsBitField([
        IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages,
    ]);

const client = new Client({
    intents: myIntents
});

client.on('messageCreate', (message) => {
    if (message.content === 'Hello') {
        message.reply({
            content: `Hello ${message.author.globalName}`
        });
    }
});

client.login(process.env.DISCORD_BOT_ID);