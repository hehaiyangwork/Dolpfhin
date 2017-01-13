#!/usr/bin/env node

var program = require('commander'),
    Promise = require("bluebird"),
    gs = require('../lib/GenerateStructure')
    spawn = require('child_process').spawn;

var version = require('../package.json').version;

program
  .version(version)
  .usage('[init [project name] | watch] [options] \n  Version: '+ version)
  .parse(process.argv);

var comd = program.args[0];

if (!comd) program.help();

if(comd == "init"){

  var pname = !program.args[1] == true ? "" : program.args[1];

  var outs = program.without ? program.without.split(',') : []

  Promise.all([gs(pname)])
    .then(function(){
      //todo:
    });

}else if(comd == "watch"){
    console.log("watch ...");
}else{
    console.log("dolphin: command not found: "+ comd);
}
