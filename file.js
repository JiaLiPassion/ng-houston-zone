const fs = require('fs');

fs.open('./test.txt', 'r', (err, fd) => {
  if (err) throw err;
  fs.fstat(fd, (err, stat) => {
    if (err) throw err;
    setTimeout(() => {
      doSomethingWithFd(fd);
    });
    fs.read(
        fd, Buffer.alloc(10), 0, 10, stat.size - 10, (err, bytesRead, b) => {
          if (err) throw err;
          // not safe to close here
          fs.close(fd, (err) => {
            if (err) throw err;
          });
        });
  });
});