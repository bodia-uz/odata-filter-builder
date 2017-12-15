import babel from 'rollup-plugin-babel';

export default {
  plugins: [
    babel({
      presets: [['@babel/preset-env', { modules: false }]],
      babelrc: false
    })
  ]
};