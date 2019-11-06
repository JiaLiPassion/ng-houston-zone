const fs = require('fs');

function readFile(fd, stat, callback) {
  fs.read(fd, Buffer.alloc(10), 0, 10, stat.size - 10, (err, bytesRead, b) => {
    callback(err, bytesRead, b);
  });
}

function doSomethingElseWithFd(fd, stat, callback) {
  readFile(fd, stat, callback);
}

fs.open('./test.txt', 'r', (err, fd) => {
  // open file and we get a file descriptor
  // imagine fd is very very very expensive resouce
  // we need to close it when everything is done
  if (err) throw err;
  // read status of the file
  fs.fstat(fd, (err, stat) => {
    if (err) throw err;
    let taskADone = false;
    let taskBDone = false;
    function tryToCloseFd() {
      if (taskADone && taskBDone) {
        fs.close(fd, err => {
          if (err) throw err;
        });
      }
    }
    readFile(fd, stat, (err) => {
      if (err) throw err;
      taskADone = true;
      tryToCloseFd();
    });
    doSomethingElseWithFd(fd, stat, (err) => {
      if (err) throw err;
      taskBDone = true;
      tryToCloseFd();
    });

    // how about we add another async operation need fd?
    // add taskCDone?
  });
});