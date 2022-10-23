export default {
  format: ['esm'],
  entry: [
    'src/index.ts',
  ],
  dts: {
    resolve: true,
    entry: './src/index.ts',
  },
  clean: true,
}
