import { ExtendedClient } from "./structs/ExtendedClient";
import "colors";

const client = new ExtendedClient();

client.start();

client.on("clientReady", () => { 
    console.log(`🤖 Bot online como ${client.user?.tag}`.green);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "❌ Ocorreu um erro.", ephemeral: true });
        } else {
            await interaction.reply({ content: "❌ Ocorreu um erro.", ephemeral: true });
        }
    }
});