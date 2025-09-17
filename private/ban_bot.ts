import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("banbot")
        .setDescription("Ban em um usuário do Crypta (Staff)")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers), 

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({
            content: "Comando desabilitado temporáriamente.",
            ephemeral: true 
        });
    }
};