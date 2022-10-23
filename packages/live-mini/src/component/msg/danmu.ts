import type { DanmuMsg } from 'blive-message-listener'
import { usernameCom } from '../username'

export const danmuMsgCom = (msg: DanmuMsg) => {
  return `${usernameCom(msg.user)}: ${msg.content}`
}