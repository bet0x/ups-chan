// import * as Meeseeks from "../helpers.js"
import { isPrivileged } from "../auth/authorization.js"
import * as DB from "../database/database.js"
/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function listEmojis(message, client) {
  if (message.content === "$listEmojis") {
    if (!isPrivileged(message.member)) return
    console.log("listing emojis")
    const emojiList = client.emojis.map(
      e =>
        `**${client.emojis.get(e.id)} Name**: ${e.name}, **Identifier**: ${
          e.identifier
        }, **ID:** ${e.id}`
    )

    // let toSend = Meeseeks.superSplit(emojiList.join("\n"), 2000)
    message.channel.send(emojiList.join("\n"), { split: true })
    // console.log(toSend);
    // emojiList.forEach(el => message.channel.send(el, { split: true }))
    // Meeseeks.superArraySplit(Array(50).fill(mock), 500).forEach(el => console.log(el))
  }
}

/**
 * List Emojis the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function listChannels(message, client) {
  if (message.content === "$listChannels") {
    if (!isPrivileged(message.member)) return
    console.log("listing channels")
    const channelList = message.member.guild.channels.map(
      c => `**$Name**: ${c.name}, **Type**: ${c.type}, **ID:** ${c.id}`
    )
    message.channel.send(channelList.join("\n"), { split: true })
  }
}

/**
 * List channels the bot has access to.
 * @param  {[type]}  message [description]
 * @param  {[type]}  client  [description]
 * @return {Boolean}         [description]
 */
export function listRoles(message, client) {
  if (message.content === "$listRoles") {
    if (!isPrivileged(message.member)) return
    console.log("listing roles")
    const roleList = message.member.guild.roles.map(
      r =>
        `**$Name**: ${r.name}, **Members**: ${r.members.size}, **ID:** ${r.id}`
    )
    message.channel.send(roleList.join("\n"), { split: true })
  }
}

export function dumpConf(message, client) {
  if (message.content === "$getConfiguration") {
    if (!isPrivileged(message.member)) return
    console.log("Dumping conf")
    DB.Connect(message.guild)
      .table("configuration")
      .get(0)
      .then(conf =>
        message.channel.send(
          "Current configuration :" + JSON.stringify(conf, null, 4)
        )
      )
  }
}

export function bossMod(message, client) {
  if (!isPrivileged(message.member)) return
  if (message.content.startsWith("$bossMod")) {
    let args = message.content
      .slice(1)
      .trim()
      .split(/ +/g)
    let command = args.shift().toLowerCase()
    let firstArg = args[0]
    let secondArg = args[1]

    if (firstArg === "on") {
      DB.UpdateConfiguration(message.guild, { bossMod: true })
      message.reply("BossMod is on!")
    }
    if (firstArg === "off") {
      DB.UpdateConfiguration(message.guild, { bossMod: false })
      message.reply("BossMod is off!")
    }
    if (firstArg === "channel" && secondArg) {
      DB.UpdateConfiguration(message.guild, { bossChannel: secondArg })
      message.reply("Boss Channel set to " + secondArg)
    }
  }
}

export function setRegion(message, client) {
  if (!isPrivileged(message.member)) return
  if (message.content.startsWith("$setRegion")) {
    let args = message.content
      .slice(1)
      .trim()
      .split(/ +/g)
    let command = args.shift().toLowerCase()
    let firstArg = args[0]

    if (firstArg === "eu") {
      DB.UpdateConfiguration(message.guild, { region: "eu" })
      message.reply("Region set to EU!")
    }
    if (firstArg === "na") {
      DB.UpdateConfiguration(message.guild, { region: "na" })
      message.reply("Region set to NA!")
    }
  }
}

export async function fixDB(message, client) {
  if (message.content === "$fixServerNameDB") {
    let app = await client.fetchApplication()
    if (app.owner.id == message.author.id) {
      console.log("Hi master")
      DB.addServerNametoDB(client)
      message.reply("Done master.")
    } else {
      console.log("Nice try.")
    }
  }
}
