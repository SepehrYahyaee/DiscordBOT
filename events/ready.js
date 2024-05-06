module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`bot ${client.user.tag} is ready!`);
    },
};