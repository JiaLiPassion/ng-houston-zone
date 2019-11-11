require('zone.js/dist/zone-node');

const zoneA = Zone.current.fork({
  name: 'zoneA',
  onInvoke: (delegate, curr, target, callback, applyThis, applyArgs) => {
    console.log('zoneA curr', curr.name, ', target:', target.name);
    return delegate.invoke(target, callback, applyThis, applyArgs);
  }
});

const zoneB = zoneA.fork({
  name: 'zoneB',
  onInvoke: (delegate, curr, target, callback, applyThis, applyArgs) => {
    console.log('zoneB curr', curr.name, ', target:', target.name);
    return delegate.invoke(target, callback, applyThis, applyArgs);
  }
});

zoneB.run(() => {});
