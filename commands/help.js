const Discord = require("discord.js");

module.exports = {
    name: "help",
    async execute(msg, args){
        const embed = new Discord.RichEmbed().setTitle("Help | Commandes").setColor("9b59b6")
        .addField("h.play | Pour jouer", "Cette commande permet de jouer au bingo !", false)
        .addField("h.stats | Pour les stats", "Cette commande vous permet de voir vos stats !", false)
        .addField("Source code ?", "https://github.com/ShineLoliMC/Hana-Art-s-Bot", false)
        .setThumbnail(msg.author.avatarURL);
        msg.channel.send(embed);
    }
}
