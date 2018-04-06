import babel from 'rollup-plugin-babel';

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
  output: {
    name: 'ODataFilterBuilder',
    exports: 'named'
  }
};