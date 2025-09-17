import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Jogue cara ou coroa!"),

    async execute(interaction: ChatInputCommandInteraction) {
        
        const resultado = Math.random() < 0.5 ? "cara" : "coroa";

        const embed = new EmbedBuilder()
            .setTitle("🪙 Coinflip")
            .setColor(0xFFD700)
            .setDescription(`O resultado foi: **${resultado.toUpperCase()}**!`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};