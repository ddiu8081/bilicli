import { openRoom } from 'danmu-console-helper';
import type { MsgHandler } from 'danmu-console-helper';

const handler: MsgHandler = {
  onHeartbeat: (online) => {
    console.log(`online: ${online}`);
  },
  onIncomeDanmu: (msg) => {
    console.log(msg.user.uname, msg.content);
  },
  onIncomeDanmuRaw(data) {
    console.log(data.info)
  },
  // onWatchedChange: (newWatched) => {
  //   console.log('newWatched', newWatched)
  // },
}

openRoom(41682, handler);

// const num = 6067854
// const intToColorHex = (int: number) => {
//   const hex = int.toString(16);
//   console.log(hex)
//   return hex.length === 1 ? `#0${hex}` : `#${hex}`;
// };
// console.log(intToColorHex(num))