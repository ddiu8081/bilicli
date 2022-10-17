import { startInstance } from './instance'
import { getRoomInfo } from './utils/getInfo'

const startApp = async (roomId: number, options: AppOptions) => {
  const roomInfo = await getRoomInfo(roomId)
  if (!roomInfo) {
    console.log('房间不存在')
    return process.exit(1)
  }
  console.log(roomId, `(${roomInfo.parent_area_name}·${roomInfo.area_name})`, roomInfo.title)
  startInstance(roomInfo.room_id, options)
}

export { startApp }
