module.exports = {
    name: 'welcome',
    description: "Welcome Message",
    execute(message, args){
        message.channel.send('Salut!');
    }
}