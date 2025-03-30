import 'dotenv/config'
// require('dotenv').config()
import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js'
import languageMachine from './detect.js'
import practice from './slash_commands/practice.js';

const commands = [
    {
        name: 'practice',
        description: 'Makes you do vocab',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

const main = async () => {
    const danishMachine = new languageMachine('da')

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    })

    client.once(Events.ClientReady, async (readyClient) => {
        console.log(`Logged in as ${readyClient.user.tag}`)
    })

    client.on(Events.MessageCreate, async (message) => {
        if (message.author.id === process.env.APP_ID) { return }
        if (message.channel.name !== 'general') { return }
        if (message.content.length < 10) { return }
        if (await danishMachine.isLanguage(message.content)) { return }
        message.reply("Her skiver vi kun i dansk FOR HELVEDE!!")
    })

    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) { return; }
        if (interaction.commandName === 'practice') { practice(interaction) }
    })

    // console.log(process.env.DISCORD_TOKEN)
    await client.login(process.env.DISCORD_TOKEN)
}

main()


export default main
