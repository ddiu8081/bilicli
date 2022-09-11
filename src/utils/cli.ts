import yargs from 'yargs'

export const getInputId = (): number => {
  // @ts-ignore
  const args = yargs.argv['_']
  return args[args.length - 1]
}