module.exports = {
    name: 'welcome',
    description: "Set Welcome Message Channel",
    execute(message, args){
        message.channel.send('Great Success!');
    }
}