const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token } = require('./config.json');
const { runInNewContext } = require('vm');
const { config } = require('process');
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

const HelperEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Helper Application')
.setURL('https://docs.google.com/forms/d/e/1FAIpQLSfM7Nv2jOoUwk5EmStQao4zMDUN-5kjQeNG-_v-bN4JxJvrbA/viewform')
.addField('Apply here: shorturl.at/qrzC3', 'Status: OPEN')

const PREmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('PR Application')
.setURL('https://docs.google.com/forms/d/e/1FAIpQLSfKTwbwzvUrkl0vGTFo_hmhj9shBX3QqnGccLfKbrwzOqpYrQ/viewform')
.addField('Apply here: shorturl.at/rsHS2', 'Status: OPEN')

client.on('ready', () => {
    console.log('ONLINE')
    client.user.setActivity('RomaniaBot v1.3', { type: 'PLAYING' });

    let myGuild = client.guilds.cache.get('701409424446849104');
    let memberCount =  myGuild.memberCount;
    let MemberCountChannel = myGuild.channels.cache.get('723181902583955510');
    MemberCountChannel.setName('Members: ' + memberCount)
})

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === "tu")
  {
    if(message.author.id === '450300560168714243' || message.author.id === '442033755721302026')
      message.channel.send("Tu esti")
    else
      message.channel.send("Nu esti tu")
  }
  if(command === "nebun") 
  {
     message.channel.send("Esti prea nebun");      
  }
  if(command === "noi")
  {
    message.channel.send("https://www.youtube.com/watch?v=ZnO-GMw7dfI")
  }
  if(command === "helpere")
  {
    message.channel.send(HelperEmbed);
  }
  if(command === "pre")
  {
    message.channel.send(PREmbed);
  }

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
          if (!deletionLog) return console.log(`Un mesaj al user-ului ${message.author.tag} a fost sters insa nu am gasit log-ul potrivit.`);
        
          // We now grab the user object of the person who deleted the message
          // Let us also grab the target of this action to double check things
          const { executor, target } = deletionLog;
        
        
          // And now we can update our output with a bit more information
          // We will also run a check to make sure the log we got was for the same author's message
          if (target.id === message.author.id) {
            client.channels.cache.get(`729442853238866010`).send(`Un mesaj al user-ului ${message.author.tag} a fost sters de ${executor.tag}.`);
          }	else {
            client.channels.cache.get(`729442853238866010`).send(`Un mesaj al user-ului ${message.author.tag} a fost sters insa nu stiu de cine.`);
          }
        });

        client.on('guildMemberRemove', async member => {
          const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
          });
          // Since we only have 1 audit log entry in this collection, we can simply grab the first one
          const kickLog = fetchedLogs.entries.first();
        
          // Let's perform a sanity check here and make sure we got *something*
          if (!kickLog) return console.log(`${member.user.tag} a iesit din de pe server.`);
        
          // We now grab the user object of the person who kicked our member
          // Let us also grab the target of this action to double check things
          const { executor, target } = kickLog;
        
          // And now we can update our output with a bit more information
          // We will also run a check to make sure the log we got was for the same kicked member
          if (target.id === member.id) {
            client.channels.cache.get(`729442853238866010`).send(`${member.user.tag} a primit kick de la ${executor.tag}?`);
          } else {
            client.channels.cache.get(`729442853238866010`).send(`${member.user.tag} a iesit de pe server.`);
          }
        });

        client.on('guildBanAdd', async (guild, user) => {
          const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
          });
          // Since we only have 1 audit log entry in this collection, we can simply grab the first one
          const banLog = fetchedLogs.entries.first();
        
          // Let's perform a sanity check here and make sure we got *something*
          if (!banLog) return console.log(`${user.tag} a fost banat, dar nu au fost gasite log-urile.`);
        
          // We now grab the user object of the person who banned the user
          // Let us also grab the target of this action to double check things
          const { executor, target } = banLog;
        
          // And now we can update our output with a bit more information
          // We will also run a check to make sure the log we got was for the same kicked member
          if (target.id === user.id) {
            client.channels.cache.get(`729442853238866010`).send(`${user.tag} a primit ban de la ${executor.tag}.`);
          } else {
            client.channels.cache.get(`729442853238866010`).send(`${user.tag} a primit ban.`);
          }
        });

        client.on('inviteCreate', async invite => {
          const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'INVITE_CREATE',
          });
          const inviteLog = fetchedLogs.entries.first();

          if(!inviteLog) return console.log(`${user.tag} a creat un invite link.`);
        })

        client.on('roleCreate', async role => {
          const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_CREATE',
          });

          const roleLog = fetchedLogs.entries.first();

          if(!roleLog) return console.log(`${user.tag} a creat un rol.`);

          const { executor, target } = roleLog;

        })

client.login(token);

