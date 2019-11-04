require('zone.js/dist/zone-node');
require('zone.js/dist/zone-error');
require('zone.js/dist/long-stack-trace-zone');

function a() {
  setTimeout(() => {
    b();
  });
}

function b() {
  setTimeout(() => {
    c();
  });
}

function c() {
  Promise.resolve(1).then(() => {
    throw new Error('error in c');
  });
}

Zone.current.fork(Zone['longStackTraceZoneSpec']).runGuarded(a);