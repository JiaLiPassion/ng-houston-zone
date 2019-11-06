require('zone.js/dist/zone.js');
require('zone.js/dist/zone-testing.js');
const asyncTest = Zone[Zone.__symbol__('asyncTest')];

function testAsync(a, callback) {
  setTimeout(() => {
    a++;
    callback(a);
  }, 100);
}

describe('testAsync', () => {
  it('test async operation', asyncTest(() => {
       let a = 0;
       testAsync(a, r => {
         expect(r).toBe(1);
       });
     }));
});