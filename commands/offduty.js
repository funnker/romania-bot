module.exports = {
    name: 'offduty',
    description: "Deactivate onduty mode",
    execute(message, args){
        ondutyStaff--;
        const user = message.author;
        message.channel.send("Nu mai esti la datorie");
    }
}