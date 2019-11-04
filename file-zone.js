require('zone.js/dist/zone-node');
const fs = require('fs');

let fd = -1;
const autoReleaseFSZone = Zone.current.fork({
  name: 'releaseFS',
  onHasTask: (pd, curr, target, hasTaskState) => {
    if (!hasTaskState.macroTask && !hasTaskState.microTask && fd !== -1) {
      console.log('auto close fd', fd);
      fs.close(fd, (err) => {
        if (err) throw err;
        fd = -1;
      });
    }
    return pd.hasTask(target, hasTaskState);
  }
});

autoReleaseFSZone.run(() => {
  fs.open('./test.txt', 'r', (err, fd0) => {
    if (err) throw err;
    fd = fd0;
    fs.fstat(fd, (err, stat) => {
      console.log('stat fd');
      if (err) throw err;
      // imagine you have a setTimeout here
      setTimeout(() => {
        fs.read(
            fd, Buffer.alloc(10), 0, 10, stat.size - 10,
            (err, bytesRead, b) => {
              if (err) throw err;
              console.log('read fd in timeout');
            });
      });
      fs.read(
          fd, Buffer.alloc(10), 0, 10, stat.size - 10, (err, bytesRead, b) => {
            if (err) throw err;
            console.log('read fd');
          });
    });
  });
});
