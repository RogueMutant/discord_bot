const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    category: 'utility',
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.option.getString('command').toLowerCase()
        const command = interaction.client.command.get(commandName)
        if(!command){
            interaction.reply(`There is no command with the name \`${commandName}\`!`)
        }

        delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)]
        try {
            interaction.client.commands.delete(command.data.name);
	        const newCommand = require(`../${command.category}/${command.data.name}.js`);
	        interaction.client.commands.set(newCommand.data.name, newCommand);
	        await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.log(error);
            await interaction.reply(`There was an error when reloading the command \`${command.data.name}\`:\n\`${error.message}\``)
        }
    },
}