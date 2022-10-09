import mri from 'mri'

interface Args {}

interface AppOptions {
  roomId: number
}

export const parseCliArgs = (): AppOptions => {
  const args = mri<Args>(process.argv.slice(2), { boolean:['bar'] })
  return {
    roomId: ~~args._[args._.length - 1],
  }
}