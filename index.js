const Discord = require('discord.js');
const {prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Hello')
})

client.on('ready',() =>{
   
    let myGuild = client.guilds.cache.get('701409424446849104');
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723181902583955510');
    MemberCountChannel.setName('Members: ' + memberCount)
 })
 
 client.on('guildMemberAdd', member=>{
  let myGuild = client.guilds.cache.get('701409424446849104');
 
 
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723181902583955510');
    MemberCountChannel.setName('Members: ' + memberCount)
 }) 
 
 client.on('guildMemberRemove', member =>{
  let myGuild = client.guilds.cache.get('701409424446849104');
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723181902583955510');
    MemberCountChannel.setName('Members: ' + memberCount)
 })

 client.on('ready', () => {
   let myGuild = client.guilds.cache.get('701409424446849104');
   var onlineCount = myGuild.members.cache.filter(m => m.presence.status === 'online', m => m.members.roles.cache.find('719306842630520912'));
   let roleID = '719306842630520912';
   let staffCount = myGuild.roles.cache.get(roleID).members.size;
   let StaffCountChannel = myGuild.channels.cache.get('723269866077028483');
   StaffCountChannel.setName('Staff: ' + onlineCount)
 })

client.login(token);

