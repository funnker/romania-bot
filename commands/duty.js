module.exports = {
    name: 'onduty',
    description: "Activate onduty mode",
    execute(message, args){
        ondutyStaff++;
        const user = message.author;
        message.channel.send("Esti la datorie");
    }
}