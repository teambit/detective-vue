const fs = require('fs');
const compiler = require('vue-template-compiler');
const flatten = require('lodash.flatten');
const precinct = require('precinct');


module.exports = function(src, options = {}) {
  const { script, styles } = compiler.parseComponent(src, { pad: 'line' });
  const scriptDependencies  = script ? precinct(script.content, { es6: { mixedImports : true } } ).map(dep => ({ type: 'script', dep })) : [];
  const styleDependencies  = script ? flatten(styles.map(style => precinct(style.content, { type: style.lang || 'scss' } ).map(dep => ({ type: style.lang || 'scss' , dep })))): [];
  return scriptDependencies.concat(styleDependencies);
};