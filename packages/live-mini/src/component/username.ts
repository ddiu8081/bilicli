import chalk from 'chalk'
import type { User } from 'blive-message-listener'
import { getGuardColor } from '../utils/parse'

export const usernameCom = (user: User) => {
  let badge, rank, admin
  if (user.badge) {
    const badgeColor = user.badge.anchor.is_same_room ? user.badge.color : '#999999'
    badge = chalk.bgHex(badgeColor)(` ${user.badge.name} `) + chalk.bgHex('#ffffff').hex(badgeColor)(` ${user.badge.level} `)
  }
  if (user.identity?.rank) {
    rank = chalk.bgBlue(` 榜${user.identity.rank} `)
  }
  if (user.identity?.room_admin) {
    admin = chalk.bgRed(` 房 `)
  }
  const uname = chalk.hex(getGuardColor(user.identity?.guard_level))(user.uname)
  const components = [
    badge,
    rank,
    admin,
    uname,
  ].filter(Boolean)
  return components.join(' ')
}