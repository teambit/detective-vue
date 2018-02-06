const fs = require('fs');
const compiler = require('vue-template-compiler');
const flatten = require('lodash.flatten');
const precinct = require('precinct');


module.exports = function(src, options = {}) {
  const { script, styles } = compiler.parseComponent(src, { pad: 'line' });
  const scriptDependencies  = script ? precinct(script.content, { es6: { mixedImports : true } } ) : [];
  const styleDependencies  = script ? flatten(styles.map(style => precinct(style.content, { type: style.lang || 'scss' } ))) : [];
  return scriptDependencies.concat(styleDependencies);
};