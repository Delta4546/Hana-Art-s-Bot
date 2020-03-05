const Data = require("../utils/data");
const Discord = require("discord.js");
module.exports = {
    name: "play",
    async execute(msg, args, playersingame, numberplayer){
        const d = new Data();
        d.createAccount(msg.author.id)
        if(args.length == 1){
            if(playersingame.get(msg.author.id) != null){
                const embed = new Discord.RichEmbed().setTitle("Erreur !").setColor("e74c3c")
                .addField(":x: Vous êtes déjà en jeux ! :x:", "Veuillez terminer la party avant d'en relancer une !", false);
                msg.channel.send(embed);
                return;
            }else{
                const embed = new Discord.RichEmbed().setTitle("Humm, je vais choisir un nombre !")
                .addField("Mon nombre est entre 0 et 100", "(Fais h.play [Nombre] pour répondre)", false)
                .setColor("1abc9c")
                .setFooter(msg.author.username, msg.author.avatarURL);
                msg.channel.send(embed);
                playersingame.set(msg.author.id, 1)
                numberplayer.set(msg.author.id, Math.floor(Math.random() * 100));
                return;
            }
        }else{
            if(playersingame.get(msg.author.id) != null){
                if(isNaN(args[1].replace("*", "").replace("/","").replace("+","").replace("-", "")+"*")){
                    const ntbp = Number.parseInt(args[1].replace("*", "").replace("/","").replace("+","").replace("-", ""));
                    const ntbb = Number.parseInt(numberplayer.get(msg.author.id));
                    if(ntbp != ntbb){
                        const embed = new Discord.RichEmbed().setTitle(":x: Tu as perdu ! :x:").setColor("e74c3c")
                        .addField("Je pensais au nombre "+ntbb, "Mais tu peux retenter ta chance ;)", false)
                        .setFooter(msg.author.username, msg.author.avatarURL)
                        msg.channel.send(embed);
                        playersingame.remove(msg.author.id);
                        numberplayer.remove(msg.author.id);
                        const json = d.getJsonFileContent(msg.author.id);
                        json.loose = Number.parseInt(json.loose)+1;
                        d.writeFile(msg.author.id, JSON.stringify(json));
                        return;
                    }else{
                        const embed = new Discord.RichEmbed().setTitle(":tada: Tu as gagné ! :tada:").setColor("2ecc71")
                        .addField("Je pensais au nombre "+ntbb, "Bien jouer mec :)", false)
                        .setFooter(msg.author.username, msg.author.avatarURL)
                        msg.channel.send(embed);
                        playersingame.remove(msg.author.id);
                        numberplayer.remove(msg.author.id);
                        const json = d.getJsonFileContent(msg.author.id);
                        json.win = Number.parseInt(json.win)+1;
                        d.writeFile(msg.author.id, JSON.stringify(json));
                        return;
                    }
                }else{
                    const embed = new Discord.RichEmbed().setTitle("Erreur !").setColor("e74c3c")
                    .addField(":x: "+args[1]+" n'est pas un nombre :x:", "Veuillez mettre un nombre !", false);
                    msg.channel.send(embed);
                    return;
                }

            }else{
                const embed = new Discord.RichEmbed().setTitle("Erreur !").setColor("e74c3c")
                .addField(":x: Vous n'avez pas encore joué ! :x:", "Veuillez jouer pour accéder à vos stats !", false);
                msg.channel.send(embed);
                return;
            }
        }
    }
}
