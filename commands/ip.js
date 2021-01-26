const Discord = require('discord.js');

module.exports = {
    name: 'ip',
    description: "Server IP",
    usage: "ip",
    execute(client, message, args){
        var embed = new Discord.MessageEmbed()
        .setColor('0x03B600') //DARK-GREEN
        .setAuthor('SERVER IP')
        .addField('Java Edition', 'buildtheearth.net (1.12.2 to latest version | vanilla or BTE Modpack)')
        .addField('Bedrock Edition', 'bedrock.buildtheearth.net | PORT: 19132')

        message.channel.send(embed);
    }
}