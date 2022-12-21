import { startListen } from 'blive-message-listener'
import type { MsgHandler } from 'blive-message-listener'
import { danmuMsgCom, superChatMsgCom, giftMsgCom, guardBuyMsgCom } from './component/msg'

export const startInstance = (roomId: number, options: AppOptions) => {
  global.appOptions = options
  const handler: MsgHandler = {
    onIncomeDanmu: (msg) => {
      !msg.body.lottery && console.log(danmuMsgCom(msg.body))
    },
    onIncomeSuperChat: (msg) => {
      console.log(superChatMsgCom(msg.body))
    },
    onGift: (msg) => {
      console.log(giftMsgCom(msg.body))
    },
    onGuardBuy(msg) {
      console.log(guardBuyMsgCom(msg.body))
    },
  }
  startListen(roomId, handler)
}