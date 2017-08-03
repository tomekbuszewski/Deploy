const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

// Function for running scripts inside node
const run = function (command, cb) {
  exec(command, function (err, stdout, stderr) {
    if (err != null) {
      return cb(new Error(err), null);
    } else if (typeof(stderr) != "string") {
      return cb(new Error(stderr), null);
    } else {
      return cb(null, stdout);
    }
  });
};

var currentDeployId;

// Function for getting git url
const gitUrl = function() {
  const configFile = path.resolve('.git', 'config');
  const config = (fs.readFileSync(configFile, 'utf8')).trim();
  const configStart = config.search('url');
  const configEnd = config.search('fetch =');

  return ((config.substr(configStart, configEnd - configStart)).trim()).replace('url = ', '');
};

// Function for getting current date for dir
const getNow = function() {
  return new Date().getTime().toString();
};

// Function that reads config
const getConfig = function() {
  if (fs.existsSync(path.resolve('.deploy'))) {
    return JSON.parse(fs.readFileSync('.deploy', 'utf8'));
  }
};

// Function for creating directory for the new deployment
const createDir = function() {
  currentDeployId = getNow();

  if (fs.existsSync(currentDeployId)) {
    return;
  } else {
    fs.mkdirSync(currentDeployId);
    console.log('Directory ' + currentDeployId + ' created');

    run('git clone '+gitUrl()+' '+currentDeployId, function(err) {
      if (err) { return false } else {
        console.log('Cloned into '+currentDeployId);

        run('cd '+currentDeployId+' && yarn install', function(err) {
          if (err) { return false } else {
            console.log('Installed');

            run('cd ' + currentDeployId + ' && '+getConfig().command, function() {
              console.log('Built using '+ getConfig().command);
            });
          }
        })
      }
    })
  }
};

createDir();