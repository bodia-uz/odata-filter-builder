import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/ODataFilterBuilder.js',
  plugins: [
    babel({
      // NOTE: loose mode is requird for valid work
      presets: [['@babel/preset-env', {
        loose: true,
        modules: false
      }]],
      babelrc: false
    }),
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'ODataFilterBuilder',
      exports: 'named'
    },
    {
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd',
      name: 'ODataFilterBuilder',
      exports: 'named',
      plugins: [terser()]
    }
  ]
};
