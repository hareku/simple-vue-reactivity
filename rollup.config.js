import typescript from 'rollup-plugin-typescript'

export default {
  input: 'example/app.ts',
  output: {
    file: 'example/app.js',
    format: 'iife'
  },
  plugins: [
    typescript()
  ]
}
