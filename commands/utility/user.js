const { SlashCommandBuilder } = require("discord.js");
const { cooldown } = require("./ping");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information on the user'),
    async execute(interaction){
        interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`)
    }
}