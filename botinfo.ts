import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Mostra informações sobre o bot"),

    async execute(interaction: ChatInputCommandInteraction) {
        const uptime = interaction.client.uptime!;
        const createdAt = interaction.client.user?.createdAt;

        const uptimeSeconds = Math.floor(uptime / 1000);
        const uptimeField = `<t:${Math.floor(Date.now() / 1000 - uptimeSeconds)}:R>`;

        const embed = new EmbedBuilder()
            .setColor(0x2dfc03)
            .setTitle(`${interaction.client.user?.username}™`)
            .setThumbnail(interaction.client.user?.displayAvatarURL({ size: 1024 }))
            .addFields(
                { name: "<:E_Developer:1418416571088502794> Criadores", value: "b3nj4z1n", inline: true },
                { name: "<:E_Node_Js:1418415016859926528> Linguagem", value: "TypeScript & Node.js", inline: true },
                { name: "Uptime", value: uptimeField, inline: true },
                { name: "<:E_Engrenagem:1418416569704386721> Versão", value: "1.0.0", inline: true },
                { name: "Host", value: "DisCloud", inline: true },
                { name: "Ping", value: `${interaction.client.ws.ping} ms`, inline: true },
                { name: "Criado em", value: createdAt ? `<t:${Math.floor(createdAt.getTime() / 1000)}:F>` : "Desconhecido", inline: false }
            );

        await interaction.reply({ embeds: [embed] });
    }
};