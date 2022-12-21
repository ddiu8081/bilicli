import ansis from 'ansis'
import type { User } from 'blive-message-listener'
import { getGuardColor } from '../utils/parse'

export const usernameCom = (user: User) => {
  const options = global.appOptions
  let badge, rank, admin
  if (options.badge && user.badge) {
    const badgeColor = user.badge.anchor.is_same_room ? user.badge.color : '#999999'
    badge = ansis.bgHex(badgeColor)(` ${user.badge.name} `) + ansis.bgHex('#ffffff').hex(badgeColor)(` ${user.badge.level} `)
  }
  if (options.rank && user.identity?.rank) {
    rank = ansis.bgBlue(` 榜${user.identity.rank} `)
  }
  if (user.identity?.room_admin) {
    admin = ansis.bgRed(` 房 `)
  }
  const uname = ansis.hex(getGuardColor(user.identity?.guard_level))(user.uname)
  const components = [
    badge,
    rank,
    admin,
    uname,
  ].filter(Boolean)
  return components.join(' ')
}