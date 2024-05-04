const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: "help",
        description: "Replies with Pong!"
    },
    {
        name: "shalqam",
        description: "Replies with Shalqam"
    },
];

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