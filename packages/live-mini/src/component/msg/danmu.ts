import ansis from 'ansis'
import type { DanmuMsg } from 'blive-message-listener'
import { usernameCom } from '../username'

const danmuType = (msg: DanmuMsg) => {
  if (msg.emoticon) {
    return '[表情]'
  } else if (msg.lottery) {
    return '[抽奖]'
  }
  return ''
}

export const danmuMsgCom = (msg: DanmuMsg) => {
  const components = [
    `${usernameCom(msg.user)}:`,
    ansis.yellow(danmuType(msg)),
    msg.content,
  ].filter(Boolean)

  return components.join(' ')
}