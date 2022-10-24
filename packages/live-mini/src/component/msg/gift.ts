import ansis from 'ansis'
import type { GiftMsg } from 'blive-message-listener'
import { usernameCom } from '../username'

const sendMaster = (msg: GiftMsg) => {
  if (msg.send_master?.uname) {
    return `给 ${ ansis.magenta(msg.send_master.uname) }`
  }
  return ''
}

export const giftMsgCom = (msg: GiftMsg) => {
  const components = [
    usernameCom(msg.user),
    '赠送了',
    ansis.magenta(`(¥${ msg.price / 1000 }) ${ msg.gift_name }`),
    `* ${ msg.amount }`,
    sendMaster(msg),
  ].filter(Boolean)

  return components.join(' ')
}