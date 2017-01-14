#!/usr/bin/env node

var program = require('commander'),
    Promise = require('bluebird'),
    gs = require('../lib/GenerateStructure'),
    download = require('../lib/DownloadFile'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    fs = Promise.promisifyAll(require('fs-extra'));

var version = require('../package.json').version;

program
  .version(version)
  .usage('[init [project name] | build | watch] [options] \n  Version: '+ version)
  .parse(process.argv);

var comd = program.args[0];

if (!comd) program.help();

/**
 * 命令判断逻辑
 */
switch(comd){
  case 'init':
    func_init();
    break;
  case 'build':
    func_build();
    break;
  case 'watch':
    func_watch();
    break;
  case 'debug':
    func_debug();
    break;
  default:
    console.log('dolphin: command not found: '+ comd);
}

/**
 * 自定义异常
 * @param {[type]} code    [description]
 * @param {[type]} message [description]
 */
function MyError(code, message){
  this.code = code;
  this.message = message;
}

/**
 * 目录初始化
 * @return {[type]} [description]
 */
function func_init(){
  var project_name = !program.args[1] == true ? "" : program.args[1];
  return fs.readdirAsync('./' + project_name)
    .then(function(files){
    	if(files.length > 0){
    		throw new MyError(500, 'not empty folder');
    	}
    })
    .then(function(){
      return gs(project_name);
    })
    .catch(function(err){
      console.log(err.message);
    });
}

function func_build(){
  // 2.下载依赖 3.编译打包
  console.log("build ...");
  // .then(function(){
  //   return fs.existsAsync("apps");
  // })
  // .then(function(exists){
  //   console.log(exists);
  //   console.log(1);
  // })
  //
  // var outs = program.without ? program.without.split(',') : [];
  // 加载默认配置文件
  // var config = require(process.cwd() + "/" + pname + '/bluedolphin');
  // git_init();
  // Promise.all([download_vendor_files(pname)])
  //   .then(function(){
  //     //todo:
  //
  //   });
}

function func_watch(){
  // 3.编译打包 4.文件监听
  console.log("watch ...");
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

function func_debug(){
  // 当前执行的node路径
  console.log(process.execPath)
  // 获取当前模块文件所在目录的完整绝对路径
  console.log(__dirname)
  // 当前执行程序的路径
  console.log(process.cwd())
}
