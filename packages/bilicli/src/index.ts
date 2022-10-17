#!/bin/env node
import { name, version } from '../package.json'
import { cac } from 'cac'

import { live } from './actions/live'
import { mini } from './actions/live-mini'

const cli = cac(name)

// live
cli
  .command('live <room_id>', 'Open live console in full mode')
  .option('--no-badge', 'Hide badge of user')
  .option('--no-rank', 'Hide rank of user')
  .action(live)

// mini
cli
  .command('mini <room_id>', 'Open live console in mini mode')
  .option('--no-badge', 'Hide badge of user')
  .option('--no-rank', 'Hide rank of user')
  .action(mini)

cli.help()
cli.version(version)

cli.parse()
