import { render } from '@temir/core'
import { h } from 'vue'
import App from './App.vue'

const startApp = (roomId: number, options: AppOptions) => {
  const NewApp = {
    render() {
      return h(App, { roomId, options })
    }
  }

  render(NewApp)
}

export { startApp }
