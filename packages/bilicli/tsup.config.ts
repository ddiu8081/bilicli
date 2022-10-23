import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['esm'],
  entry: [
    'src/index.ts',
  ],
  dts: {
    resolve: true,
    entry: './src/index.ts',
  },
  clean: true,
})
