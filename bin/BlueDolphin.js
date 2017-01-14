#!/usr/bin/env node

var program = require('commander'),
    Promise = require('bluebird'),
    gs = require('../lib/GenerateStructure'),
    df = require('../lib/DownloadFile'),
    exec = require('child_process').exec,
    execSync = require('child_process').execSync,
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
 * @param {number} code    [description]
 * @param {string} message [description]
 */
function MyError(code, message){
  this.code = code;
  this.message = message;
}

/**
 * 工程初始化
 * @return {[type]} [description]
 */
function func_init(){
  var project_name = !program.args[1] == true ? "" : program.args[1];
  if(project_name){
    // 必须同步执行
    var mkdir = 'mkdir -p ./' + project_name;
    var child = execSync(mkdir, function(err, stdout, stderr) {
        if (err) throw err;
    });
  }
  return fs.readdirAsync('./' + project_name)
    .then(function(files){
    	if(files.length > 0) throw new MyError(500, 'not empty folder');
    })
    .then(function(){
      // 生成工程目录结构
      gs(project_name);
    })
    .then(function(){
      git_init(project_name);
    })
    .catch(function(err){
      console.log(err);
    });
}

/**
 * 工程构建
 * @return {[type]} [description]
 */
function func_build(){
  // 2.下载依赖 3.编译打包
  var config;
  return fs.accessAsync('./bluedolphin.js', fs.F_OK)
    .catch(function(err){
      throw new MyError(500, 'config file [bluedolphin.js] not exist');
    })
    .then(function(){
      // 加载默认配置文件
      config = require(process.cwd() + '/bluedolphin');
    })
    .then(function(){
      // 下载依赖文件
      if(!config.vendor) throw new MyError(500, 'config vendor undefined');
      if(!config.vendor.dir) throw new MyError(500, 'config vendor dir undefined');
      if(!config.vendor.files) throw new MyError(500, 'config vendor files error');
      if(!(config.vendor.files instanceof Array)) throw new MyError(500, 'config vendor files must be Array');

      download_vendor_files(config.vendor.dir, config.vendor.files);
    })
    .catch(function(err){
        console.log(err);
    });
}

function func_watch(){
  // 3.编译打包 4.文件监听
  console.log("watch ...");
}

/**
 * 下载依赖文件
 * @param  {string} vendor_dir  输出目录
 * @param  {Array} vendor_files 文件数组
 * @return {[type]}              [description]
 */
function download_vendor_files(vendor_dir, vendor_files){
  for(var i = 0; i< vendor_files.length; i++){
    var file_dir = vendor_dir;
    if(vendor_files[i].child_dir) file_dir += vendor_files[i].child_dir;
    df(vendor_files[i].url, vendor_files[i].name, file_dir);
  }
}

/**
 * git初始化
 * @return {[type]} [description]
 */
function git_init(project_name){
  var comd = '';
  if(project_name){
    comd += 'cd ./' + project_name + " && ";
  }
  comd += 'git init && git add . && git commit -m "first blood"';
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
