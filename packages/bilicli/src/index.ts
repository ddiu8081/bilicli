#!/bin/env node
import { name, version } from '../package.json'
import { cac } from 'cac'

import { live } from './actions/live'

const cli = cac(name)

// create
cli
  .command('live <room_id>', 'Open live console in full mode')
  .option('--no-badge', 'Hide badge of user')
  .option('--no-rank', 'Hide rank of user')
  .action(live)

cli.help()
cli.version(version)

cli.parse()
