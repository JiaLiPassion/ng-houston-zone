async function waitForTimeout(a) {
  return new Promise(res => setTimeout(() => {
                       a.idx++;
                       res();
                     }, 100));
}

async function testAsync() {
  let a = {idx: 0};
  await waitForTimeout(a);
  console.log(`after await: ${a.idx}`);
}

testAsync();