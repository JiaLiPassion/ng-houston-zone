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

a();