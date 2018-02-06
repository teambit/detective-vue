const fs = require('fs');
const compiler = require('vue-template-compiler');
const flatten = require('lodash.flatten');


module.exports = function(src, options = {}) {
  var precinct = require('./');
  const { script, styles } = compiler.parseComponent(src, { pad: 'line' });
  const scriptDependencies  = script ? precinct(script.content, { es6: { mixedImports : true } } ) : [];
  const styleDependencies  = script ? flatten(styles.map(style => precinct(style.content, { type: style.lang || 'scss' } ))) : [];
  return scriptDependencies.concat(styleDependencies);
};