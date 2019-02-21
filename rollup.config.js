import replace from 'rollup-plugin-re'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'index.js',
  output: [
    {file: 'main.js', format: 'cjs'},
    {file: 'main.es.js', format: 'esm'}
  ],
  plugins: [
    replace({
      patterns: [
        {
          test: /eval.*\(moduleName\);/g,
          replace: 'undefined;'
        }
      ]
    }),
    // resolve({
    //   customResolveOptions: {
    //     moduleDirectory: 'node_modules'
    //   }
    // }),
    commonjs()
    // babel({exclude: 'node_modules/**', '*.es.js'})
  ],
  // external: ['protobufjs/minimal']
}
