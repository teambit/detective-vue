const fs = require('fs');
const compiler = require('vue-template-compiler');
const flatten = require('lodash.flatten');

module.exports = function(src, options = {}) {
  const precinct = require('precinct');
  const { script, styles } = compiler.parseComponent(src, { pad: 'line' });
  const scriptDependencies  = script ? precinct(script.content, { es6: { mixedImports : true } } ).map(dep => ({ isScript: true, dep })) : [];
  const styleDependencies  = script ? flatten(styles.map(style => precinct(style.content, { type: style.lang || 'scss' } ).map(dep => ({ isScript: false , dep })))): [];
  return scriptDependencies.concat(styleDependencies);
};