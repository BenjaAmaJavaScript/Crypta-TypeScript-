import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

const dailyCooldowns = new Map<string, number>();

export const command = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Resgate sua recompensa diária!"),

    async execute(interaction: ChatInputCommandInteraction) {
        const userId = interaction.user.id;
        const now = Date.now();
        const cooldown = 24 * 60 * 60 * 1000; 
        const lastClaim = dailyCooldowns.get(userId) || 0;

        if (now - lastClaim < cooldown) {
            const nextTime = new Date(lastClaim + cooldown);
            return interaction.reply({
                content: `❌ Você já recebeu sua recompensa hoje! Volte em <t:${Math.floor(nextTime.getTime() / 1000)}:R>.`,
                ephemeral: true
            });
        }

        
        dailyCooldowns.set(userId, now);

        const reward = Math.floor(Math.random() * 500) + 100;

        const embed = new EmbedBuilder()
            .setTitle("Recompensa Diária")
            .setColor(0xFFD700)
            .setDescription(`Parabéns, ${interaction.user}! Você recebeu **${reward} Crypta Coins** como recompensa diária.`)
            .setTimestamp()
            .setFooter({ text: "Volte amanhã para receber novamente!" });

        await interaction.reply({ embeds: [embed] });
    }
};