const Discord = require("discord.js");
const Data = require("../utils/data");
module.exports = {
    name: "stats",
    async execute(msg, args){
        const d = new Data();
        if(d.HaveAccount(msg.author.id) == 0){
            const embed = new Discord.RichEmbed().setTitle("Erreur !").setColor("e74c3c")
            .addField(":x: Vous n'avez pas encore joué ! :x:", "Veuillez jouer pour accéder à vos stats !", false);
            msg.channel.send(embed);
            return;
        }else{
            const s = d.getJsonFileContent(msg.author.id);
            if(s.loose == 0){
                if(s.win == 0){
                    const embed = new Discord.RichEmbed().setTitle("Erreur !").setColor("e74c3c")
                    .addField(":x: Vous n'avez pas encore joué ! :x:", "Veuillez jouer pour accéder à vos stats !", false);
                    msg.channel.send(embed);
                    return;
                }
            }
            const w = Number.parseInt(s.win);
            const l = Number.parseInt(s.loose);
            const embed = new Discord.RichEmbed().setTitle("Stats de "+msg.author.username)
            .setThumbnail(msg.author.avatarURL)
            .addField(":star2: Partie(s) gagner : "+s.win, "Vos partie(s) que vous avez gagnée(s) !", false)
            .addField(":x: Partie(s) perdu: "+s.loose, "Vos partie(s) que vous avez perdu !", false)
            .addField(":muscle: Ratio: "+(w/l),"Votre ratio !", false).setColor("f1c40f");
            msg.channel.send(embed)
            return;
        }
    }

}
