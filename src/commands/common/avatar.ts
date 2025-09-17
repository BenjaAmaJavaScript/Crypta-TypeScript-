import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Mostra o avatar de um usuário")
        .addUserOption(option => 
            option.setName("usuario")
                  .setDescription("Escolha um usuário")
                  .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser("usuario") || interaction.user;

        const embed = new EmbedBuilder()
            .setTitle(`${user.tag}`)
            .setImage(user.displayAvatarURL({ forceStatic: false, size: 1024 }))
            .setColor("Random");

        await interaction.reply({ embeds: [embed] });
    }
};