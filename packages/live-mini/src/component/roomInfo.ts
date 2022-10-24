import ansis from 'ansis'
import type { RoomInfo } from '../utils/getInfo'

export const roomInfoCom = (roomInfo: RoomInfo) => {
  const components = [
    ansis.bold.green(`${roomInfo.room_id}`),
    ansis.green(`(${roomInfo.parent_area_name}·${roomInfo.area_name})`),
    roomInfo.title
  ]
  return components.join(' ')
}