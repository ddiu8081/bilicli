import { startApp } from '@bilicli/live-full'

interface ArgOptions {
  badge: boolean
  rank: boolean
}

const liveFull = async(roomId: string, options: ArgOptions) => {
  startApp(~~roomId, {
    badge: options.badge,
    rank: options.rank,
  })
}

export { liveFull }
