import 'dotenv/config'
// require('dotenv').config()
import { Client, Events, GatewayIntentBits, MessageMentions } from 'discord.js'
import languageMachine from './detect.js'

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
        if (await danishMachine.isLanguage(message.content)) { return }
        message.reply("Kun dansk FOR HELVEDE")
    })

    // console.log(process.env.DISCORD_TOKEN)
    await client.login(process.env.DISCORD_TOKEN)
}

main()


export default main
