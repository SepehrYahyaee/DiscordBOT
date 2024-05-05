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

for (const file of commandFiles) {
    const filePath = path.join(path.join(__dirname, 'SlashCommands'), file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`data or execution function is missing from slash command located at:
        ${filePath}`);
    };
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`slash command with the given name ${interaction.commandName} doesn\'t exist.`);
        return;
    };

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
});

client.on('ready', () => {
    console.log('bot is ready!');
})

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    } else {
        if (message.content === 'Hello') {
            message.reply({
                content: `Hello ${message.author.globalName}`
            });
        }
    }
});

client.on('messageUpdate', (message) => {
    console.log('updated message is: ', message.reactions.message.content);
    console.log('last message was: ', message.content);
});

client.on('guildMemberAdd', (member) => {
    member.send({
        content: `Welcome ${member.user.globalName} e bache Koni`
    })
});

client.login(process.env.DISCORD_BOT_TOKEN);