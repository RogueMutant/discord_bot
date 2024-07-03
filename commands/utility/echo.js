const { SlashCommandBuilder, ChannelType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)
        .setMaxLength(2_000)
    )
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('The channel to echo to')
        .addChannelTypes(ChannelType.GuildText)
    )
    .addBooleanOption(option =>
        option.setName('embed')
        .setDescription('Wether or not to embed the echo')
    )
    ,
    async execute(interaction){
        const input = interaction.option.getString('input')
        const channel = interaction.option.getChannel('channel')
        const embed = interaction.option.getBoolean('embed')

        const content = useEmbed
        ? { embeds: [new MessageEmbed().setDescription(input).setColor('RANDOM')] }
        : { content: input };

        if (channel) {
            await channel.send(content);
            await interaction.reply({ content: 'Echoed to the specified channel.', ephemeral: true });
        } else {
            await interaction.reply(content);
        }
    }
}