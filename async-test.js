function testAsync(a, callback) {
  setTimeout(() => {
    a++;
    callback(a);
  }, 100);
}

describe('testAsync', () => {
  it('test async operation', (done) => {
    let a = 0;
    testAsync(a, r => {
      expect(r).toBe(1);
      done();
    });
  });
});