const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a specific member')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Select the intended member')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the ban')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm Ban')
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(cancel, confirm);

        await interaction.reply({
            content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
            components: [row],
        });

        const filter = i => i.customId === 'confirm' || i.customId === 'cancel';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'confirm') {
                await interaction.guild.members.ban(target, { reason });
                await i.update({ content: `${target.tag} has been banned for reason: ${reason}`, components: [] });
            } else {
                await i.update({ content: 'Ban action canceled.', components: [] });
            }
        });

        collector.on('end', collected => {
            if (!collected.size) {
                interaction.editReply({ content: 'Ban action timed out.', components: [] });
            }
        });
    }
};
