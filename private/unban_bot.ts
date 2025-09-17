import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionsBitField } from "discord.js";

const bannedUsers = new Map<string, string>();

export const unbanbot = {
    data: new SlashCommandBuilder()
        .setName("unbanbot")
        .setDescription("Remove o banimento de um usuário do bot")
        // Apenas staff consegue ver e usar o comando
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
        .addUserOption(option =>
            option.setName("usuario")
                  .setDescription("Usuário que será desbanido")
                  .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser("usuario", true);

        if (!bannedUsers.has(user.id)) {
            return interaction.reply({ 
                content: `❌ ${user.tag} não está banido do bot.`, 
                ephemeral: true 
            });
        }

        bannedUsers.delete(user.id);

        await interaction.reply(`✅ ${user.tag} foi desbanido do bot!`);
    }
};