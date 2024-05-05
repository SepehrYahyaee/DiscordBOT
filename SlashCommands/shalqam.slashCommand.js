const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shalqam')
        .setDescription('Replies with Shalaqatain!'),

    async execute(interaction) {
        await interaction.reply('Shalaqatain!');
    },
};