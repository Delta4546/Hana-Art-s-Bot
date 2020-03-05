const Discord = require("discord.js");
const bot = new Discord.Client();

const HashMap = require("hashmap")

const playersingame = new HashMap();
const numberplayer = new HashMap();

//NOT ME
const fs = require('fs');
bot.cmds = new Discord.Collection();

const cmdsf = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of cmdsf) {
    const cmd = require(`./commands/${file}`);
    bot.cmds.set(cmd.name, cmd);
    console.log(cmd.name+" was loaded !")
}

//NOT ME


bot.on("ready", () => {
    bot.user.setActivity("Hana Art's | h.help");
})

bot.on('message', async msg => {
    if(msg.author.bot) return;
    if(!msg.content.startsWith("h.")) return;
    let args = msg.content.replace("h.", "").split(" ");
    const cmd = bot.cmds.get(args[0]);
    try{
        if(cmd.name == "play"){
            cmd.execute(msg, args, playersingame, numberplayer);
            return;
        }
        cmd.execute(msg, args);
    }catch (error){
        return;
    }
});

bot.login(process.env.BOT_TOKEN);
