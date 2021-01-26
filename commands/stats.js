module.exports = {
    name: 'stats',
    description: "Stats",
    usage: "stats",
    execute(client, message, args){
        let myGuild = client.guilds.cache.get("701409424446849104");
        let memberCount = myGuild.memberCount;
        message.channel.send(`${memberCount} members`);
    }
}