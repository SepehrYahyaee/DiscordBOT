module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.author.bot) {
            return;
        } else {
            if (message.content === 'Hello') {
                message.reply({
                    content: `Hello ${message.author.globalName}`
                });
            }
        }
    }
};