const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token } = require('./config.json');
const { runInNewContext } = require('vm');
const { config } = require('process');
const { Server } = require('http');
const client = new Discord.Client();
var db = require('quick.db');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('THE BOT IS ONLINE')
    client.user.setActivity('RomaniaBot v1.3', { type: 'PLAYING' });
})

/*
#########################
COMMANDS
#########################
*/

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === "setwelcome") //Set welcome message channel
  {
    client.commands.get('setwelcome').execute(client, message, args);
  }

  if(command === "setlogs")
  {
    client.commands.get('setlogs').execute(client, message, args);
  }

  if(command === "members")
  {
    client.commands.get('stats').execute(client, message, args);
  }

  if(command === "ip")
  {
    client.commands.get('ip').execute(client, message, args);
  }
}) 
 
client.on('guildMemberAdd', member=>{
  let x = db.get(`welcomechannel_${member.guild.id}`);
  if(x == null)
    return;
  x = member.guild.channels.cache.get(x)

  x.send(`Salut ${member}, bine ai venit pe serverul **BTE Romania + Moldova [Official]**!`)

  member.send("Bun venit pe server-ul oficial de Discord BTE Romania! \n Câteva informații importante: \n -Pentru a face parte din echipă trebuie să faci o cerere pe site-ul oficial (link-ul îl vei găsii mai jos și pe canalul #📄applications📄). Construcțiile trebuie să fie replici la scara 1:1 la clădiri din viața reală! \n -În canalul #🎋downloads🎋 găsiți installer-ul oficial BTE, care va crea o versiune care va conține modpack-ul și o hartă BTE pe care va trebui să construiți clădirile pentru **cererea de builder**! \n Pentru întrebări folosiți canalul #suport de pe server! ")
  member.send("Welcome to the official BTE Romania Discord Server! \n  Here are some important Informations for you: \n -If you want to be part of the team you have to apply on the official BTE website (click the link below or find it on the #📄applications📄 channel). The application must contain 1:1 scale buildings that exist in real life! \n -You can find the modpack installer in the #🎋downloads🎋. It will create a premade version of Minecraft in your launcher that will have a premade world where you can start building for the **builder application**! \n If you have any questions please aks them on the #support channel on our server!")    
  member.send("BTE official website: https://buildtheearth.net/buildteams/89")
}) 

/*
#########################
LOGGING
#########################
*/

client.on('messageDelete', message => { //DONE
  if(message.author.bot)
    return;

  let x = db.get(`loggingchannel_${message.guild.id}`);

  if(x == null)
    return;
  x = message.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0x00ffff') //AQUA
  .setThumbnail(message.author.avatarURL())
  .setAuthor(message.author.tag)
  .setDescription('Message Deleted')
  .addField('Message', message.content)
  .addField('Channel', message.channel)
  .setFooter('User ID: ' + message.author.id)
  .setTimestamp()

  //let loggingChannel = message.guild.channels.cache.find(ch => ch.name === "test")
  x.send(embed)
})

client.on('messageUpdate', (oldMessage, newMessage) => { //DONE
  if(oldMessage.content == newMessage.content)
    return;

  if(oldMessage.author.bot)
    return;

  let x = db.get(`loggingchannel_${oldMessage.guild.id}`);

  if(x == null)
    return;
  x = oldMessage.guild.channels.cache.get(x)
    
  var embed = new Discord.MessageEmbed()
  .setColor('0x00ffff') //AQUA
  .setThumbnail(oldMessage.author.avatarURL())
  .setAuthor(oldMessage.author.tag)
  .setDescription('Message Edited')
  .addField('Old Message', oldMessage.content)
  .addField('New Message', newMessage.content)
  .addField('Channel', oldMessage.channel)
  .setFooter('User ID: ' + oldMessage.author.id)
  .setTimestamp()

  x.send(embed)
})

client.on('channelCreate', channel => {
  let x = db.get(`loggingchannel_${channel.guild.id}`);

  if(x == null)
    return;
  x = channel.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0x00ff00') //GREEN
  .setAuthor('Channel Created')
  .addField('Channel Name', channel.name)
  .setFooter('Channel ID: ' + channel.id)
  .setTimestamp()

  x.send(embed)
})

client.on('channelDelete', channel => {
  let x = db.get(`loggingchannel_${channel.guild.id}`);

  if(x == null)
    return;
  x = channel.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0x00ff00') //GREEN
  .setAuthor('Channel Deleted')
  .addField('Channel Name', channel.name)
  .setFooter('Channel ID: ' + channel.id)
  .setTimestamp()

  x.send(embed)
})

client.on('channelUpdate', (oldChannel, newChannel) => {
  let x = db.get(`loggingchannel_${oldChannel.guild.id}`);

  if(x == null)
    return;
  x = oldChannel.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0x00ff00') //GREEN
  .setAuthor('Channel Edited')
  .addField('Old Channel:', oldChannel.name)
  .addField('New Channel:', newChannel.name)
  .setFooter('Channel ID: ' + oldChannel.id)
  .setTimestamp()

  x.send(embed)
})

client.on('emojiCreate', emoji => {
  let x = db.get(`loggingchannel_${emoji.guild.id}`);

  if(x == null)
    return;
  x = emoji.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0xbf00ff') //PURPLE
  .setAuthor('Emoji Created')
  .setDescription(emoji.guild.iconURL())
  .addField('Emote Name', emoji.name)
  .setTimestamp()

  x.send(embed)
})

client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  let x = db.get(`loggingchannel_${oldEmoji.guild.id}`);

  if(x == null)
    return;
  x = oldEmoji.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0xbf00ff') //PURPLE
  .setAuthor('Emoji Edited')
  .setDescription(oldEmoji.guild.icon)
  .addField('Emote Old Name', oldEmoji.name)
  .addField('Emote New Name', newEmoji.name)
  .setTimestamp()

  x.send(embed)
})

client.on('emojiDelete', emoji => {
  let x = db.get(`loggingchannel_${emoji.guild.id}`);

  if(x == null)
    return;
  x = emoji.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0xbf00ff') //PURPLE
  .setAuthor('Emoji Deleted')
  .setDescription(emoji.guild.icon)
  .addField('Emote Name', emoji.name)
  .setTimestamp()

  x.send(embed)
})

client.on('guildBanAdd', (guild, user) => {
  let x = db.get(`loggingchannel_${user.guild.id}`);

  if(x == null)
    return;
  x = user.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0xcc0000') //DARK RED
  .setAuthor(user.tag + 'has been banned from this server')
  .setFooter('User ID:', user.id)
  .setTimestamp()

  x.send(embed)
})

client.on('guildBanRemove', (guild, user) => {
  let x = db.get(`loggingchannel_${user.guild.id}`);

  if(x == null)
    return;
  x = user.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0xcc0000') //DARK RED
  .setAuthor(user.tag + 'has been unbanned')
  .setFooter('User ID:', user.id)
  .setTimestamp()

  x.send(embed)
})

client.on('roleCreate', role => {
  let x = db.get(`loggingchannel_${role.guild.id}`);

  if(x == null)
    return;
  x = role.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0x0000ff') //BLUE
  .setAuthor('Role Created')
  .addField('Role Name:', role.name)
  .setFooter('Role ID:', role.id)
  .setTimestamp()

  x.send(embed)
})

client.on('roleDelete', role => {
  let x = db.get(`loggingchannel_${role.guild.id}`);

  if(x == null)
    return;
  x = role.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0x0000ff') //BLUE
  .setAuthor('Role Deleted')
  .addField('Role Name:', role.name)
  .setFooter('Role ID:', role.id)
  .setTimestamp()

  x.send(embed)
})

client.on('roleUpdate', (oldRole, newRole) => {
  let x = db.get(`loggingchannel_${oldRole.guild.id}`);

  if(x == null)
    return;
  x = oldRole.guild.channels.cache.get(x)

  var embed = new Discord.MessageEmbed()
  .setColor('0x0000ff') //BLUE
  .setAuthor('Role Edited')
  .addField('Old Name:', oldRole.name)
  .addField('New Name:', newRole.name)
  .setFooter('Role ID:', role.id)
  .setTimestamp()

  x.send(embed)
})

client.login(token);


