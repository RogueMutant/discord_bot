const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('info about a user or server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('info about a target user')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('The user to get info about')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('info about the server')
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');

            if (user) {
                await interaction.reply(`Username: ${user.username}, User ID: ${user.id}`);
            } else {
                await interaction.reply(`Your username: ${interaction.user.username} and your ID is: ${interaction.user.id}`);
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply(`Server name: ${interaction.guild.name}, \nMember count: ${interaction.guild.memberCount}`);
        }
    }
};
