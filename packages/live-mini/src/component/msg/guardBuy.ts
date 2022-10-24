import ansis from 'ansis'
import type { GuardBuyMsg } from 'blive-message-listener'
import { usernameCom } from '../username'
import { getGuardColor } from '../../utils/parse'

export const guardBuyMsgCom = (msg: GuardBuyMsg) => {
  const components = [
    `${usernameCom(msg.user)}:`,
    `(¥${ msg.price / 1000 })`,
    ansis.hex(getGuardColor(msg.user.identity?.guard_level))(msg.gift_name),
  ].filter(Boolean)

  return components.join(' ')
}