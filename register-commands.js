const fs = require('fs');
const path = require('path');
const { REST, Routes} = require('discord.js');
require('dotenv').config();

const commands = [];

const commandFiles = fs.readdirSync(path.join(__dirname, 'SlashCommands'));

for (const file of commandFiles) {
    const filePath = path.join(path.join(__dirname, 'SlashCommands'), file);
    const command = require(filePath);

    ('data' in command && 'execute' in command) 
    ? commands.push(command.data.toJSON()) 
    : console.log(`data or execution function is missing at path: ${filePath}`);
}

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

(async function registerCommands() {
    try {
        console.log(`Registering ${commands.length} Slash Commands...`);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_BOT_ID, process.env.MY_GUILD_ID),
            { body: commands },
        );
        console.log(`Successfully Reloaded and Added ${data.length} Slash Commands.`);
    } catch (error) {
        console.log(error);
    }
})();