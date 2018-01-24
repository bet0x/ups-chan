import * as Messages from "../verbose/messages.js"
import { checkMemberForRolesIds } from "../auth/authorization.js"
import { authorizedRolesIds } from "../auth/authorization.js"

/**
 * Check if a member can create a nodewar
 * @param  {[type]} member [description]
 * @return {[type]}        [description]
 */
export function canCreateNodeWar(member) {
  return
  checkMemberForRolesIds(member, authorizedRolesIds) ||
    member.permissions.has("ADMINISTRATOR")
}

/**
 * Clear the attending members.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function clearAttendingMembers(message, channel, role) {
  message.member.guild.roles
    .find("name", role.name)
    .members.forEach(member => member.removeRole(role).catch(console.error))
  message.channel.send(`The attending roles have been correctly removed.`)
}

/**
 * Attend a Nodewar
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
export function attendNodeWar(msg, channel, role) {
  // Assign the role to the member
  msg.member.addRole(role).catch(console.error)
  // Send the message, mentioning the member
  msg.member.user.createDM().then(function(DM) {
    DM.send(Messages.getRandomOkMessage())
  })
  // msg.reply("As you wish.")
  channel.send(msg.member.user.username + " will attend at the upcoming memewar!") // TAG the user
}

/**
 * Cancel an attendance to a NodeWar
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
export function cancelNodeWarAttendance(msg, channel, role) {
  // Remove the role from the member
  msg.member.removeRole(role).catch(console.error)
  // Send the message, mentioning the member
  msg.member.user.createDM().then(function(DM) {
    DM.send(Messages.getRandomOkMessage())
  })
  channel.send(msg.member.user.username + " will not attend! Next time fosure though.")
}
