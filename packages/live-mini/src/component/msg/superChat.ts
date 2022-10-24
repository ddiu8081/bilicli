import ansis from 'ansis'
import type { SuperChatMsg } from 'blive-message-listener'
import { usernameCom } from '../username'

export const danmuMsgCom = (msg: SuperChatMsg) => {
  const components = [
    `${usernameCom(msg.user)}:`,
    `(¥${ msg.price })`,
    ansis.hex(msg.content_color)(msg.content)
  ].filter(Boolean)

  return components.join(' ')
}