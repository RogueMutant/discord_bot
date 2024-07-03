const { REST, Routes } = require('discord.js');
require('dotenv').config()

const rest = new REST().setToken(process.env.BOT_TOKEN);
(async ()=>{
    try {
        // for guild-based commands
        await rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, 'commandId'))
        .then(() => console.log('Successfully deleted guild command'))
        .catch(console.error);

        // for global commands
        await rest.delete(Routes.applicationCommand(clientId, 'commandId'))
        .then(() => console.log('Successfully deleted application command'))
        .catch(console.error);
    } catch (error) {
        console.log(error);
    }
})()
