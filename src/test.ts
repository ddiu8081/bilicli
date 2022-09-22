import { startListen, type MsgHandler } from 'blive-message-listener'

const handler: MsgHandler = {
  onIncomeDanmu: (msg) => {
    console.dir(msg, { depth: null });
  },
  onIncomeSuperChat: (msg) => {
    console.dir(msg, { depth: null });
  }
}

startListen(652581, handler);
