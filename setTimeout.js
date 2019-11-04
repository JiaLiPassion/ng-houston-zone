function timeout(a) {
  setTimeout(() => {
    a.idx++;
  }, 100);
}

function testTimeout() {
  let a = {idx: 0};
  timeout(a);
  console.log(`after timeout: ${a.idx}`);
}

testTimeout();