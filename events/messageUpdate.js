module.exports = {
    name: 'messageUpdate',
    once: false,
    execute(message) {
        console.log('updated message is: ', message.reactions.message.content);
        console.log('last message was: ', message.content);
    }
};