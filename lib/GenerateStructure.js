var Promise = require("bluebird"),
    fs = Promise.promisifyAll(require('fs-extra'));

var root = __dirname.replace(/Dolphin\/lib/,'Dolphin/');

function GenerateStructure(project,outs){
  return fs.copyAsync(root + 'structure', project)
    .then(function(err){
      return err ?  console.error(err) : console.log('Generate project success');
    })
}

module.exports = GenerateStructure;
