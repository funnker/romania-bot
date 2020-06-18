const Discord = require('discord.js');
const {prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Hello')
})

client.on('ready',() =>{
   
    let myGuild = client.guilds.cache.get('723143172410310686');
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723148360558706788');
    MemberCountChannel.setName('Members: ' + memberCount)
 })
 
 client.on('guildMemberAdd', member=>{
  let myGuild = bot.guilds.cache.get('723143172410310686');
 
 
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723148360558706788');
    MemberCountChannel.setName('Members: ' + memberCount)
 }) 
 
 client.on('guildMemberRemove', member =>{
  let myGuild = client.guilds.cache.get('723143172410310686');
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723148360558706788');
    MemberCountChannel.setName('Members: ' + memberCount)
 })

client.login(token);

