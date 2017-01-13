// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// // App variables
// var file_url = 'https://avatars2.githubusercontent.com/u/6905598?v=3&s=460';
// var file_name = 'avatar.png';
// var file_dir = './downloads/';

// Function to download file using curl
var download_file_curl = function(file_url, file_name, file_dir) {

    // extract the file name
    // var file_name = url.parse(file_url).pathname.split('/').pop();

    // create an instance of writable stream
    var file = fs.createWriteStream(file_dir + file_name);
    // execute curl using child_process' spawn function
    var curl = spawn('curl', [file_url]);
    // add a 'data' event listener for the spawn instance
    curl.stdout.on('data', function(data) { file.write(data); });
    // add an 'end' event listener to close the writeable stream
    curl.stdout.on('end', function(data) {
        file.end();
        console.log(file_name + ' downloaded to ' + file_dir);
    });
    // when the spawn child process exits, check if there were any errors and close the writeable stream
    curl.on('exit', function(code) {
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
}

function downloadedFile(file_url, file_name, file_dir){
  // We will be downloading the files to a directory, so make sure it's there
  // This step is not required if you have manually created the directory
  var mkdir = 'mkdir -p ' + file_dir;
  var child = exec(mkdir, function(err, stdout, stderr) {
      if (err) throw err;
      else download_file_curl(file_url, file_name, file_dir);
  });

}

module.exports = downloadedFile;
