const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token } = require('./config.json');
const { runInNewContext } = require('vm');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log('ONLINE')

    let myGuild = client.guilds.cache.get('701409424446849104');
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723181902583955510');
    MemberCountChannel.setName('Members: ' + memberCount)

    let StaffCountChannel = myGuild.channels.cache.get('723269866077028483');
    StaffCountChannel.setName('Active Staff: ' + ondutyStaff)
    
})

let DutyRole = '724607373380943936';
var ondutyStaff = 0;

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(message.member.roles.has(719306842630520912))
  {
    if(command === 'onduty' && !message.member.roles.cache.has(724607373380943936))
    {
      ondutyStaff++;
      message.member.addRole(DutyRole);
      message.channel.send("Esti la datorie");
    }

  if(command === 'offduty' && message.member.roles.cache.has(724607373380943936))
    {
      ondutyStaff--;
      message.member.roles.remove("Onduty")
      message.channel.send("Nu mai esti la datorie");      
    }
  }

  
 /*
  switch(args)
  {
    case "onduty":
      client.commands.get('onduty').execute(message, args);
    break;

    case "offduty":
      client.commands.get("offduty").execute(message, args);
    break;
  } */
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
/*
 client.on('ready', () => {

   let myGuild = client.guilds.cache.get('701409424446849104');
   let roleID = '719306842630520912';
   const onlineCount = myGuild.members.cache.filter(m => m.roles.cache.has(roleID) && m.presence.status === 'online').size;
   let StaffCountChannel = myGuild.channels.cache.get('723269866077028483');
   StaffCountChannel.setName('Active Staff: ' + onlineCount)
 })

 client.on('userUpdate', () => {
  let myGuild = client.guilds.cache.get('701409424446849104');
  let roleID = '719306842630520912';
  const onlineCount = myGuild.members.cache.filter(m => m.roles.cache.has(roleID) && m.presence.status === 'online').size;
  let StaffCountChannel = myGuild.channels.cache.get('723269866077028483');
  StaffCountChannel.setName('Active Staff: ' + onlineCount)
}) */


client.login(token);

