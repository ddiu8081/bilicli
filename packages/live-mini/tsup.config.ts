import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['esm', 'cjs'],
  entry: [
    'src/index.ts',
  ],
  dts: {
    resolve: true,
    entry: './src/index.ts',
  },
  clean: true,
})
