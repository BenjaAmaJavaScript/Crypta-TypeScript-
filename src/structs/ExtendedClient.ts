import { 
    Client, 
    Partials, 
    IntentsBitField, 
    Collection, 
    REST, 
    Routes 
} from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export class ExtendedClient extends Client {
    public commands: Collection<string, any> = new Collection();

    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
                IntentsBitField.Flags.GuildPresences,
                IntentsBitField.Flags.GuildVoiceStates,
            ],
            partials: [
                Partials.Channel, 
                Partials.GuildMember, 
                Partials.Message, 
                Partials.User, 
                Partials.GuildScheduledEvent, 
                Partials.Reaction, 
                Partials.SoundboardSound
            ]
        });
    }

    
    private getAllCommandFiles(dir: string): string[] {
        let results: string[] = [];
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                results = results.concat(this.getAllCommandFiles(fullPath));
            } else if (file.endsWith(".ts") || file.endsWith(".js")) {
                results.push(fullPath);
            }
        });
        return results;
    }

    public async start() {
        const token = process.env.BOT_TOKEN;
        const clientId = process.env.CLIENT_ID;

        if (!token) throw new Error("❌ BOT_TOKEN não definido no .env");
        if (!clientId) throw new Error("❌ CLIENT_ID não definido no .env");

        const commandsPath = path.join(__dirname, "../commands");

        console.log("Procurando comandos em:", commandsPath);

        const commandFiles = fs.existsSync(commandsPath)
            ? this.getAllCommandFiles(commandsPath)
            : [];

        console.log("Arquivos de comandos encontrados:", commandFiles.map(f => path.basename(f)));

        const commandsData: any[] = [];

        for (const file of commandFiles) {
            const imported = await import(file);
            
            const command = imported.command;
            if (command?.data && command?.execute) {
                this.commands.set(command.data.name, command);
                commandsData.push(command.data.toJSON());
            }
        }

        
        const rest = new REST({ version: "10" }).setToken(token);
        await rest.put(Routes.applicationCommands(clientId), { body: commandsData });

        console.log(`✅ ${commandsData.length} comandos registrados globalmente.`);

        // Login do bot
        await this.login(token);
    }
}