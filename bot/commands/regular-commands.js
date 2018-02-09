import moment from "moment-timezone"
import { sendEmbedHelpAsDM } from "../verbose/functions.js"
import { getRandomMeeseeksInteraction } from "../verbose/messages.js"
const timezone = "Europe/Paris"

export function meeseeksAnswer(message, client) {
  //MeeseeksBOT ID
  if (message.author.id == "159985870458322944") {
    message.channel.send(getRandomMeeseeksInteraction()).then(m => {
      setTimeout(() => {
        m.delete()
      }, 2500)
    })
  }
}

export function ups(message, client) {
  const regex = /(\bups\b)+/gim
  let randomly = Math.floor(Math.random() * 4)
  if (regex.test(message.content) && randomly == 1) {
    message
      .react("🇺")
      .then(() => message.react("🇵"))
      .then(() => message.react("🇸"))
      .then(() => {
        const emoji = message.guild.emojis.find("name", "PagChomp")
        message.react(emoji)
      })
      .catch(() => console.error("One of the emojis failed to react.")) // message.react("316287767648927744")
  }
}

export function secretAlzy(msg) {
  if (msg.content === "alzy") {
    console.log("Alzy !!")
    // Send the message to a designated channel on a server:
    const channel = msg.member.guild.channels.find(
      "name",
      "drama-super-important-and-private-stuff"
    )
    console.log(channel)
    // Do nothing if the channel wasn't found on this server
    if (!channel) return
    // Send the message, mentioning the member
    channel.send(
      `https://cdn.discordapp.com/attachments/318482214071566336/402574859013455873/roar.PNG`
    )
  }
}

export function pedoAge(msg, client) {
  const regex = /(\bunderage\b|\bage\b)+/gim
  let m
  // console.log("I'm a bot ? " + msg.author.bot);
  let randomly = Math.floor(Math.random() * 2)
  if (
    randomly == 1 &&
    msg.author.bot == false &&
    (m = regex.exec(msg.content)) !== null
  ) {
    console.log("Matched age somewhere...")
    const ePedoBear = client.emojis.find("name", "PedoBear") || ":)"
    const eKappa = client.emojis.find("name", "Kappa") || ":3"
    const reply = `${ePedoBear} Age is nothing but a number ... ${eKappa}`
    // console.log(reply);
    msg.reply(reply)
  }
}

export function grammar(msg) {
  const ex = ["execpt", "exectp", "excpet", "excetp", "except", "excpect"]
  if (ex.some(w => msg.content.includes(w))) {
    msg.reply("Expect. Expecting. ")
  }
}

export function help(message, client) {
  if (message.content === "$help") {
    const fields = [
      {
        name: "__Commands__",
        value:
          "- **$nodewar help** - Check that one out to learn how to use the nodewar feature.\n- *topic* **$spoiler** *content* - Creates a GIF that prevent spoiler for your content.\n- **$fs** *tet ogre* Tells you an appropriate failstack number to slam your gear on.\n- Mention me and I'll talk to you!"
      },
      {
        name: "__Admin commands__",
        value:
          "-**$setRegion *eu/na*** - Set the region to EU or NA.\n-**$bossMod on** - Enable the boss feature.\n-**$bossMod off** - Disable the boss feature.\n-**$bossMod on** - Enable the boss feature.\n-**$bossMod channel *boss*** - Set the boss chanel name to 'boss'.\n- **$listEmojis** - List the emojis I can use.\n- **$listRoles** - List the server roles.\n- **$listChannels** - List the channels.\n"
      },
      {
        name: "__ServerAdmin commands__",
        value:
          "- **$getConfiguration** - Dump the configuration related to the current server."
      }
    ]
    sendEmbedHelpAsDM(message, client, fields)
  }
}
