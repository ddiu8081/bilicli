import { startApp } from '@bilicli/live'

interface ArgOptions {
  badge: boolean
  rank: boolean
}

const live = async(roomId: string, options: ArgOptions) => {
  startApp(~~roomId, {
    badge: options.badge,
    rank: options.rank,
  })
}

export { live }
