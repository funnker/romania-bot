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

var ondutyStaff = 0;
let DutyRole = '724607373380943936';

client.on('ready', () => {
    console.log('ONLINE')

    let myGuild = client.guilds.cache.get('701409424446849104');
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723181902583955510');
    MemberCountChannel.setName('Members: ' + memberCount)

    client.user.setActivity("with depression", {
      type: "GAME"
    });
})

/*
client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

    if(command === 'onduty')
    {
      ondutyStaff++;
      message.member.addRole(DutyRole);
      message.channel.send("Esti la datorie");
    }

  if(command === 'offduty') 
    {
      ondutyStaff--;
      message.member.roles.remove(DutyRole);
      message.channel.send("Nu mai esti la datorie");      
    }

}) */
 
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
   let roleID = '719306842630520912';
   const onlineCount = myGuild.members.cache.filter(m => m.roles.cache.has(roleID) && m.presence.status === 'online').size;
   let StaffCountChannel = myGuild.channels.cache.get('723269866077028483');
   StaffCountChannel.setName('Active Staff: ' + onlineCount)
 })

 client.on('guildMemberUpdate', (oldMember, newMember) => {
  let myGuild = client.guilds.cache.get('701409424446849104');
  let roleID = '719306842630520912';
  const onlineCount = myGuild.members.cache.filter(m => m.roles.cache.has(roleID) && m.presence.status === 'online').size;
  let StaffCountChannel = myGuild.channels.cache.get('723269866077028483');
  StaffCountChannel.setName('Active Staff: ' + onlineCount)
})

client.on('presenceUpdate', (oldMember, newMember) => {
  let myGuild = client.guilds.cache.get('701409424446849104');
  let roleID = '719306842630520912';
  const onlineCount = myGuild.members.cache.filter(m => m.roles.cache.has(roleID) && m.presence.status === 'online').size;
  let StaffCountChannel = myGuild.channels.cache.get('723269866077028483');
  StaffCountChannel.setName('Active Staff: ' + onlineCount)
})

client.on('messageReactionAdd', async (reaction, user) => {
  if(user.bot)
    return;
  if(message.channels.id !== '703980745190015016')
    return;
  switch(reaction.id)
  {
    case "728250528559267922":
      member.addRole("728255332719263825");
    case "728250528559267922":
      member.addRole("728255307431804938");
  }
});
/*
client.on('messageReactionRemove', async (reaction, user) => {
  if(user.bot)
    return;
  if(message.channels.id !== '724675482779385988')
    return;
    switch(reaction.id)
    {
      case "728250528559267922":
        member.removeRole("728255332719263825");
      case "728250528559267922":
        member.removeRole("728255307431804938");
    }  
}) */

        //LOGS STUFF

        client.on('messageDelete', async message => {
          // ignore direct messages
          if (!message.guild) return;
          const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
          });
          // Since we only have 1 audit log entry in this collection, we can simply grab the first one
          const deletionLog = fetchedLogs.entries.first();
        
          // Let's perform a sanity check here and make sure we got *something*
          if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
        
          // We now grab the user object of the person who deleted the message
          // Let us also grab the target of this action to double check things
          const { executor, target } = deletionLog;
        
        
          // And now we can update our output with a bit more information
          // We will also run a check to make sure the log we got was for the same author's message
          if (target.id === message.author.id) {
            client.channels.cache.get(`729442853238866010`).send(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
          }	else {
            client.channels.cache.get(`729442853238866010`).send(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
          }
        });

client.login(token);

