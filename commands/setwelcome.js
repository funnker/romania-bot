const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: 'setwelcome',
    description: "Set Welcome Message Channel",
    usage: "setwelcome <#channel>",
    execute(client, message, args){
        let channel = message.mentions.channels.first()

        if(!channel)
        {
            return message.channel.send(`Please mention the channel first \nCurrent channel: ${channel}`)
        }

        if(!message.member.hasPermission(`MANAGE_CHANNELS`) || !message.member.hasPermission(`MANAGE_GUILD`))
        {
            return message.channel.send("You do not have the permission to use this command")
        }

        db.set(`welcomechannel_${message.guild.id}`, channel.id)

        message.channel.send(`Welcome Channel is setted as ${channel}`)
    }
}