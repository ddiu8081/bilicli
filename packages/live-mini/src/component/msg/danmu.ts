import type { DanmuMsg } from 'blive-message-listener'
import { username } from '../username'

export const danmuMsg = (msg: DanmuMsg) => {
  const userCom = username(msg.user)
  return `${userCom}: ${msg.content}`
}