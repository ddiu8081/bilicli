import { render } from '@temir/core'
import { h } from 'vue'
import App from './App.vue'

import { getRoomInfo } from './utils/getInfo'

const startApp = async (roomId: number, options: AppOptions) => {
  const roomInfo = await getRoomInfo(roomId)
  if (!roomInfo) {
    console.log('房间不存在')
    return process.exit(1)
  }

  const NewApp = {
    render() {
      return h(App, {
        roomId,
        roomInfo,
        options
      })
    }
  }

  render(NewApp)
}

export { startApp }
