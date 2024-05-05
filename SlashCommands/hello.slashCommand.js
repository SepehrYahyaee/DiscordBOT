const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hi!'),

    async execute(interaction) {
        await interaction.reply(`Hi ${interaction.user}`);
    },
};