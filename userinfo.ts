import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Mostra informações sobre um usuário")
        .addUserOption(option =>
            option.setName("membro")
                .setDescription("Selecione o membro")
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser("membro") || interaction.user;
        const member = await interaction.guild?.members.fetch(user.id);

        await interaction.reply({
            embeds: [
                {
                    color: 0x5865F2,
                    title: `Informações de ${user.username}`,
                    thumbnail: { url: user.displayAvatarURL({ size: 1024 }) },
                    fields: [
                        { name: "👤 Usuário", value: `${user.tag}`, inline: true },
                        { name: "🆔 ID", value: `${user.id}`, inline: true },
                        { name: "📆 Conta criada em", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
                        member ? { name: "📥 Entrou no servidor em", value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`, inline: false } : null,
                    ].filter(Boolean) as any
                }
            ]
        });
    }
};