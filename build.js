var
  nodeExec = require('child_process').exec,
  fs = require('fs');


var exec = function (command) {
  nodeExec(command, function (error, stdout, stderr) {
    if (error != null) {
      console.error('error running command: ' + error.stack);
      process.exit(error.code);
    }

    if (stderr.length !== 0) {
      console.error(stderr.toString());
      process.exit(1);
    }

    console.log(stdout.toString());
  });
};


if (fs.existsSync('node_modules/rdf-interfaces')) {
  exec('ln -s node_modules/rdf-interfaces/rdfi.js dist/js/rdf.js');
} else if (fs.existsSync('../rdf-interfaces')) {
  exec('ln -s ../../../rdf-interfaces/rdfi.js dist/js/rdf.js');
}

if (fs.existsSync('node_modules/rdf-ext')) {
  exec('ln -s node_modules/rdf-ext/dist/rdf-ext.js dist/js/');
} else if (fs.existsSync('../rdf-ext')) {
  exec('ln -s ../../../rdf-ext/dist/rdf-ext.js dist/js/');
}

exec('cp lib/utils/request.js dist/js/');

exec('browserify browser-client.js -o dist/js/browser-client.js');
exec('browserify lib/browser/task-worker-bg.js -o dist/js/task-worker-bg.js');