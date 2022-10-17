import readline from 'readline'

export const listenQuitCommand = () => {
  let rl: readline.Interface = readline.createInterface({ input: process.stdin, escapeCodeTimeout: 50 })

  readline.emitKeypressEvents(process.stdin, rl)
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true)
  }

  function keypressHandler(str: string, key: any) {
    // ctrl-c or esc
    if (str === '\x03' || str === '\x1B' || (key && key.ctrl && key.name === 'c')) {
      return process.exit()
    }

    const name = key?.name

    // quit
    if (name === 'q') {
      return process.exit()
    }
  }

  process.stdin.on('keypress', keypressHandler)
}