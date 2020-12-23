module.exports = {
    name: 'logs',
    description: "Set Logs Channel",
    execute(message, args){
        LogsChannel = message.channel;
        message.channel.send('Great Success!');
    }
}