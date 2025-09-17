import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import os from "os";

export const command = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Mostra informações sobre o bot."),

    async execute(interaction: ChatInputCommandInteraction) {
        const totalUsers = interaction.client.users.cache.size;
        const totalGuilds = interaction.client.guilds.cache.size;
        const uptime = Math.floor(interaction.client.uptime! / 1000); // tempo em segundos
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;

        const embed = new EmbedBuilder()
            .setTitle("🤖 Informações do Bot")
            .setColor(0x00FFFF)
            .addFields(
                { name: "Nome", value: `${interaction.client.user?.username}#${interaction.client.user?.discriminator}`, inline: true },
                { name: "ID", value: `${interaction.client.user?.id}`, inline: true },
                { name: "Servidores", value: `${totalGuilds}`, inline: true },
                { name: "Usuários", value: `${totalUsers}`, inline: true },
                { name: "Node.js", value: `${process.version}`, inline: true },
                { name: "Plataforma", value: `${os.platform()} ${os.arch()}`, inline: true },
                { name: "Tempo online", value: `${hours}h ${minutes}m ${seconds}s`, inline: true }
            )
            .setFooter({ text: "Bot criado por: Benja" })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};