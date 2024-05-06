const fs = require('fs');
const path = require('path');
const { Client, IntentsBitField, Collection } = require('discord.js');
require('dotenv').config();

const myIntents = new IntentsBitField([
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.DirectMessages,
]);

const client = new Client({
    intents: myIntents
});

client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, 'SlashCommands'));

// Slash Commands dynamic reader
for (const file of commandFiles) {
    const filePath = path.join(path.join(__dirname, 'SlashCommands'), file);
    const command = require(filePath);

    ('data' in command && 'execute' in command)
    ? client.commands.set(command.data.name, command)
    : console.log(`data or execution function is missing from slash command located at: ${filePath}`);
    
};

const eventFiles = fs.readdirSync(path.join(__dirname, 'events'));

// Events dynamic reader
for (const file of eventFiles) {
    const filePath = path.join(path.join(__dirname, 'events'), file);
    const event = require(filePath);

    (event.once)
    ? (client.once(event.name, (...args) => event.execute(...args)))
    : (client.on(event.name, (...args) => event.execute(...args)));
}

client.login(process.env.DISCORD_BOT_TOKEN);