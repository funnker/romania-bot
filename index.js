const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token } = require('./config.json');
const { runInNewContext } = require('vm');
const { config } = require('process');
const { Server } = require('http');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
//ok boss
var ondutyStaff = 0;
let DutyRole = '724607373380943936';

const HelperEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Helper Application')
.setThumbnail('https://i.imgur.com/VVp3czl.png')
.setURL('https://docs.google.com/forms/d/e/1FAIpQLSfM7Nv2jOoUwk5EmStQao4zMDUN-5kjQeNG-_v-bN4JxJvrbA/viewform')
.addField('Apply here: https://docs.google.com/forms/d/e/1FAIpQLSfM7Nv2jOoUwk5EmStQao4zMDUN-5kjQeNG-_v-bN4JxJvrbA/viewform', 'Status: OPEN')

const PREmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('PR Application')
.setThumbnail('https://i.imgur.com/VVp3czl.png')
.setURL('https://docs.google.com/forms/d/e/1FAIpQLSfKTwbwzvUrkl0vGTFo_hmhj9shBX3QqnGccLfKbrwzOqpYrQ/viewform')
.addField('Apply here: https://docs.google.com/forms/d/e/1FAIpQLSfKTwbwzvUrkl0vGTFo_hmhj9shBX3QqnGccLfKbrwzOqpYrQ/viewform', 'Status: OPEN')

const BuilderEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Builder Application')
.setThumbnail('https://i.imgur.com/VVp3czl.png')
.setURL('https://buildtheearth.net/buildteams/89')
.addField('Apply here: https://buildtheearth.net/buildteams/89/join', 'Status: OPEN')

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

  if(command === "welcome")
  {
    client.commands.get('welcome').execute(message, args);
  }
  
  if(command === "helpere")
  {
    message.channel.send(HelperEmbed);
  }
  if(command === "pre")
  {
    message.channel.send(PREmbed);
  }
  if(command === "bre")
  {
    message.channel.send(BuilderEmbed);
  }
}) 
 
 client.on('guildMemberAdd', member=>{
    let myGuild = client.guilds.cache.get('701409424446849104');
    const WelcomeChannel = member.guild.channels.cache.find(channel => channel.name === '🔰newcomers🔰')
    WelcomeChannel.send(`Salut ${member}, bine ai venit pe serverul **BTE Romania + Moldova [Official]**!`)

    member.send("Bun venit pe server-ul oficial de Discord BTE Romania! \n Câteva informații importante: \n -Pentru a face parte din echipă trebuie să faci o cerere pe site-ul oficial (link-ul îl vei găsii mai jos și pe canalul #📄applications📄). Construcțiile trebuie să fie replici la scara 1:1 la clădiri din viața reală! \n -În canalul #🎋downloads🎋 găsiți installer-ul oficial BTE, care va crea o versiune care va conține modpack-ul și o hartă BTE pe care va trebui să construiți clădirile pentru **cererea de builder**! \n Pentru întrebări folosiți canalul #suport de pe server! ")
    member.send("Welcome to the official BTE Romania Discord Server! \n  Here are some important Informations for you: \n -If you want to be part of the team you have to apply on the official BTE website (click the link below or find it on the #📄applications📄 channel). The application must contain 1:1 scale buildings that exist in real life! \n -You can find the modpack installer in the #🎋downloads🎋. It will create a premade version of Minecraft in your launcher that will have a premade world where you can start building for the **builder application**! \n If you have any questions please aks them on the #support channel on our server!")
    member.send("BTE official website: https://buildtheearth.net/buildteams/89")
    
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

        //LOGS

client.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content)
    return;
  
  let LogEmbed = new Discord.MessageEmbed()
  .setAuthor(oldMessage.author.tag, oldMessage.author.avatar)
  .setThumbnail(oldMessage.author.avatar)
  .setColor("#992ad1")
  .setDescription("Un mesaj a fost editat!")
  .addField("Inainte", oldMessage.content, true)
  .addField("Dupa", newMessage.content, true)
  .setTimestamp()

  let loggingChannel = newMessage.guild.channels.cache.find(ch => ch.name === "logs")
  if(!loggingChannel)
    return;

  loggingChannel.send(LogEmbed);

})

client.on('messageDelete', async message => {
  let LogEmbed = new Discord.MessageEmbed()
  .setTitle("Un mesaj a fost sters!")
  .setColor("#992ad1")
  .setThumbnail(message.author.avatarURL())
  .addField("Sters de: " + message.author.tag)
  .addField("Sters in: " + message.channel)
  .setTimestamp()

  let loggingChannel = message.guild.channels.cache.find(ch => ch.name === "logs")
  if(!loggingChannel)
    return;
  
  loggingChannel.send(LogEmbed);

})

client.on('channelCreate', async(channel) => {
  let LogEmbed = new Discord.MessageEmbed()
  .setTitle("Un channel a fost creat!")
  .setColor("#32a852")
  .setDescription("Nume: " + channel.name + "\n" + "Tip: " + channel.type)
  .setTimestamp()

  let loggingChannel = channel.guild.channels.cache.find(ch => ch.name === "logs")
  if(!loggingChannel)
    return;

  loggingChannel.send(LogEmbed);
})

client.on('channelDelete', async(channel) => {
  let LogEmbed = new Discord.MessageEmbed()
  .setTitle("Un channel a fost sters!")
  .setColor("#32a852")
  .setDescription("Nume: " + channel.name + "\n" + "Tip: " + channel.type)
  .setTimestamp()

  let loggingChannel = channel.guild.channels.cache.find(ch => ch.name === "logs")
  if(!loggingChannel)
    return;

  loggingChannel.send(LogEmbed);
})

client.login(token);

