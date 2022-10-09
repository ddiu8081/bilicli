import mri from 'mri'
import { name, version } from '../../package.json'

interface Args {
  help: boolean
  h: boolean
  badge: boolean
  rank: boolean
}

export const parseCliArgs = (): AppOptions => {
  const args = mri<Args>(process.argv.slice(2))

  if (!args._.length || args.help || args.h) {
    console.log(`${name} v${version}`)
    console.log('Usage: npx ${name}@latest <room_id> [--no-badge] [--no-rank]')
    process.exit(args.help || args.h ? 0 : 1)
  }

  return {
    roomId: ~~args._[args._.length - 1],
    badge: args.badge ?? true,
    rank: args.rank ?? true,
  }
}