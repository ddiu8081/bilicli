import { startListen } from 'blive-message-listener'
import type { 
  MsgHandler, Message,
  DanmuMsg, SuperChatMsg, GiftMsg, GuardBuyMsg, UserActionMsg
} from 'blive-message-listener'
import { danmuMsgCom } from './component/msg'

export const startInstance = (roomId: number, options: AppOptions) => {
  const handler: MsgHandler = {
    onIncomeDanmu: (msg) => {
      console.log(danmuMsgCom(msg.body))
    },
  }
  startListen(roomId, handler)
}