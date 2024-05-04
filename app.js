const { Client, IntentsBitField } = require('discord.js');
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

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'help') interaction.reply('Pong');
        else if (interaction.commandName === 'shalqam') interaction.reply('shalaqatain!');
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);