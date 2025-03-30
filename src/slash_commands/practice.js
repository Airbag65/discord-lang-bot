import { ActionRowBuilder, MessageFlags, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";


const practice = async (event) => {
    if (event.channel.name !== 'øve-ord') {
        event.reply('Gå til kanalen `øve-ord` for at øve dig!');
        return;
    }
    const modal = new ModalBuilder({
        customId: `TranslateThis-${event.user.id}`,
        title: "Skriv dette ord på dansk"
    })
    const answerInput = new TextInputBuilder({
        customId: "answerInput",
        label: 'kött',
        style: TextInputStyle.Short
    })
    const ar = new ActionRowBuilder().addComponents(answerInput)
    modal.addComponents(ar)
    event.showModal(modal)

    const filter = (interaction) => interaction.customId === `TranslateThis-${event.user.id}`;

    event.awaitModalSubmit({ filter, time: 20_000 })
        .then((modalInteracion) => {
            const answer = modalInteracion.fields.getTextInputValue('answerInput')

            const result = answer === 'kød' ? 'Dit svar er korrekt! :)' : 'Dit svar er forkert! :(' 
            modalInteracion.reply({ content: result, flags: MessageFlags.Ephemeral })
        }).catch((error) => {
            console.log(error)
        })
}


export default practice
