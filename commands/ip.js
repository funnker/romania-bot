module.exports = {
    name: 'ip',
    description: "Server IP",
    usage: "ip",
    execute(client, message, args){
        message.channel.send("Server IP: buildtheearth.net (version 1.12.2) \nNavigate through the compass to join our server (Right click on the compass -> Build Teams -> Europe -> BTE Romania + Moldova");
    }
}