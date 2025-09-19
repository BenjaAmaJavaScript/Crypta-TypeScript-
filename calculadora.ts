import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const math = require("math-expression-evaluator");

export const command = {
    data: new SlashCommandBuilder()
        .setName("calculadora")
        .setDescription("Calcula uma expressão matemática")
        .addStringOption(option =>
            option.setName("expressao")
                .setDescription("Digite a expressão matemática")
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const expression = interaction.options.getString("expressao", true);

        try {
            const result = math.eval(expression); 
            await interaction.reply({ content: `🧮 Resultado: \`${result}\`` });
        } catch {
            await interaction.reply({ content: "❌ Expressão inválida!", ephemeral: true });
        }
    }
};