import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bane um membro do servidor")
        .addUserOption(option =>
            option.setName("membro")
                .setDescription("Membro que você quer banir")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("motivo")
                .setDescription("Motivo do ban")
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const member = interaction.options.getUser("membro", true);
        const reason = interaction.options.getString("motivo") || "Não especificado";

        const guildMember = interaction.guild?.members.cache.get(member.id);
        if (!guildMember) return interaction.reply({ content: `Não encontrei ${member.tag} no servidor.`, ephemeral: true });

        if (!guildMember.bannable) {
            return interaction.reply({ content: `❌ Não posso banir **${member.tag}**, tem muito poder envolvido.`, ephemeral: false });
        }

        try {
            await guildMember.ban({ reason });
            await interaction.reply({ content: `${member.tag} foi banido.\nMotivo: ${reason}` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "❌ Ocorreu um erro ao tentar banir.", ephemeral: true });
        }
    }
};