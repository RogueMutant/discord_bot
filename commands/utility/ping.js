const { SlashCommandBuilder } = require("discord.js");
const wait = require('timers/promises').setTimeOut

const locales = {
    pl: 'Witaj Świecie!',
	de: 'Hallo Welt!',
}

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
    async execute(interaction){
        // await wait('2_000')
        await interaction.reply('Pong!')
        await interaction.followUp(locales[interaction.locale] ?? 'Hello World (Default is english)')
        const message = await interaction.fetchReply()
    }
}