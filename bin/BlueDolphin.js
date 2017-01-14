#!/usr/bin/env node

var program = require('commander'),
    Promise = require("bluebird"),
    gs = require('../lib/GenerateStructure'),
    download = require('../lib/DownloadFile'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec;

var version = require('../package.json').version;

// 加载默认配置文件
var config = require(process.cwd()+'/bluedolphin');

program
  .version(version)
  .usage('[init [project name] | build | watch] [options] \n  Version: '+ version)
  .parse(process.argv);

var comd = program.args[0];

if (!comd) program.help();

if(comd == "init"){
  // 1.项目初始化

  var pname = !program.args[1] == true ? "" : program.args[1];
  var outs = program.without ? program.without.split(',') : []
  Promise.all([gs(pname)])
    .then(function(){
      //todo:
      // git_init();
    });
}else if(comd == "build"){
  // 2.下载依赖 3.编译打包
  Promise.all([download_vendor_files(pname)])
    .then(function(){
      //todo:

    });

}else if(comd == "watch"){
  // 3.编译打包 4.文件监听
  console.log("watch ...");

}else if(comd == "debug"){
  // 当前执行的node路径
  console.log(process.execPath)
  // 获取当前模块文件所在目录的完整绝对路径
  console.log(__dirname)
  // 当前执行程序的路径
  console.log(process.cwd())

  console.log(config.hello);

}else{
  console.log("dolphin: command not found: "+ comd);
}

// 下载依赖文件
function download_vendor_files(pname){

  var vendor_files = config.vendor_files;
  if(vendor_files.length <= 0) return ;

  for(var i = 0; i< vendor_files.length; i++ ){
    var file_dir = !pname ? '.' + config.vendor_dir : dir + config.vendor_dir;
    if(vendor_files[i].child_dir) file_dir += vendor_files[i].child_dir;

    download(vendor_files[i].url, vendor_files[i].name, file_dir);
  }

}

function git_init(){
  var comd = 'git init && git add . && git commit -m "first blood"';
  var child = exec(comd, function(err, stdout, stderr) {
      if (err) throw err;
      else console.log("init success");
  });
}
