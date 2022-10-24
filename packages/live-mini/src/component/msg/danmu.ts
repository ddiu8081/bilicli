import ansis from 'ansis'
import type { DanmuMsg } from 'blive-message-listener'
import { usernameCom } from '../username'

export const danmuMsgCom = (msg: DanmuMsg) => {
  let msgType = ''
  if (msg.emoticon) {
    msgType = '[表情]'
  } else if (msg.lottery) {
    msgType = '[抽奖]'
  }
  return `${usernameCom(msg.user)}: ${ansis.yellow(msgType)} ${msg.content}`
}