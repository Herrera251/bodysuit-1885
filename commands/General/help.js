const djs = require("@discordjs/collection")
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../../config')
let { randomfancy,botpic,tlang } = require("../../lib/scraper");
 
module.exports = {
    name: "help",
    alias: ["h", "cmd", "menu"],
    category: "general",
    async exec(citel, Void, args,pushname) {
        if (args[0]) {
            const data = [];
            const name = args[0].toLowerCase();
            const { commands, prefix } = djs;
            const cmd = commands.get(name) || commands.find((cmd) => cmd.alias && cmd.alias.includes(name));
            if (!cmd || cmd.category === "private") return await citel.reply("*βNo Such commands.*");
            else data.push(`*πCommand:* ${cmd.name}`);
            if (cmd.alias) data.push(`*π°Alias:* ${cmd.alias.join(', ')}`);
            if (cmd.desc) data.push(`*π§©Description:* ${cmd.desc}`);
            if (cmd.use) data.push(`*γ½οΈUsage:* \`\`\`${prefix}${cmd.name} ${cmd.use}\`\`\`\n\nNote: [] = optional, | = or, <> = must filled`);

            return await citel.reply(data.join('\n'));
        } else {
            const { pushName, sender } = citel;
            const { prefix, commands } = djs;
            const cmds = commands.keys()
            let category = [];

            for (let cmd of cmds) {
                let info = commands.get(cmd);
                if (!cmd) continue;
                if (!info.category || info.category === 'private') continue;
                if (Object.keys(category).includes(info.category)) category[info.category].push(info);
                else {
                    category[info.category] = [];
                    category[info.category].push(info);
                }
            }
let str = `
β­ββββββββββββββββ        
β *Hello, ${citel.pushName}*
β *This is ${tlang().title}*
β *A whatsapp bot developed*
β *by ${Config.ownername}*
β πΌπ’ ππππππ ππππππππ πππ
β ππππππ πππππ 
β°ββββββββββββββ\n`
            const keys = Object.keys(category);
            str += `β­βββγ *Commands* γβββ`
            for (const key of keys) {
            	let anu = key[0].toUpperCase()
           
str += `
β βΏ» β­ββββββββββββββ
β βΏ» β β¦Ώ---- *${anu}${key.slice(1)}* ----β¦Ώ
β βΏ» β°β¬βββββββββββββ
β βΏ» ββ€ ${category[key].map((cmd, idx) =>`
β βΏ» β β­ ${idx + 1}. ${prefix}`+`${cmd.name}`)}
β βΏ» β°ββββββββββββββ`
            }
str += `\nβ°βββββββββββββββββ\n`
str += `_πSend ${prefix}help <command name> to get detailed information of specific command._\n*πEg:* _${prefix}help anime_`;
            let generatebutton = [{
					buttonId: `${prefix}repo`,
					buttonText: {
						displayText: 'Repoβ­'
					},
					type: 1
				}
				]
				let buttonMessaged = {
					image: { url: await botpic() },
					caption: str,
					footer: tlang().title,
					headerType: 4,
				 buttons: generatebutton,
					contextInfo: {
						externalAdReply: {
							title: tlang().title,
							body: 'Help List',
							thumbnail: log0,
							mediaType: 2,
							mediaUrl: `https://github.com/SamPandey001/Secktor-Md`,
							sourceUrl: `https://github.com/SamPandey001/Secktor-Md`,
						},
					},
				};
				await sock.sendMessage(citel.chat, buttonMessaged, {
					quoted: citel,
				});
        }
    }
}
