module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        member.send({
            content: `Welcome ${member.user.globalName} idiot!`
        })
    }
};