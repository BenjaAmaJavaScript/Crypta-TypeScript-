import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, User } from "discord.js";

const userBalances = new Map<string, number>();

export const command = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Mostra o saldo de coins de um usuário.")
        .addUserOption(option => 
            option.setName("usuario")
                  .setDescription("Escolha um usuário para ver o saldo")
                  .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const user: User = interaction.options.getUser("usuario") || interaction.user;
        const balance = userBalances.get(user.id) || 0;

        const embed = new EmbedBuilder()
            .setTitle("💰 Saldo de Coins")
            .setColor(0x00FF00)
            .setDescription(`${user} tem **${balance} coins**.`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
