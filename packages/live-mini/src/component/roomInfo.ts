import chalk from 'chalk'
import type { RoomInfo } from '../utils/getInfo'

export const roomInfoCom = (roomInfo: RoomInfo) => {
  const components = [
    chalk.bold(chalk.green(roomInfo.room_id)),
    chalk.green(`(${roomInfo.parent_area_name}·${roomInfo.area_name})`),
    roomInfo.title
  ]
  return components.join(' ')
}