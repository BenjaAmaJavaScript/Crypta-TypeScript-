import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Mostra a latência do bot."),

    async execute(interaction: ChatInputCommandInteraction) {
        const latency = Date.now() - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle("🏓 Pong!")
            .setColor(0x00FF00)
            .addFields(
                { name: "Latência do Bot", value: `${latency}ms`, inline: true },
                { name: "Latência da API", value: `${apiLatency}ms`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Comando utilizado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    }
};