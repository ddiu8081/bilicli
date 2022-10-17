import { startListen, type MsgHandler } from 'blive-message-listener'

const handler: MsgHandler = {
  onIncomeDanmu: (msg) => {
    console.dir(msg, { depth: null });
    console.log(msg.body.user.uname + ' : ' + msg.body.content);
    console.log()
  },
  onIncomeSuperChat: (msg) => {
    console.dir(msg, { depth: null });
  },
  onAttentionChange: (msg) => {
    console.log('attention', msg.body.attention)
  },
  onWatchedChange: (msg) => {
    console.log('watched', msg.body.text_small)
  },
  onGift: (msg) => {
    console.dir(msg, { depth: null });
  }
}

startListen(652581, handler);
