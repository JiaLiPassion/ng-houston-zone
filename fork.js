require('zone.js/dist/zone-node');

const zone = Zone.current.fork({
  name: 'hooks',
  onScheduleTask: (delegate, curr, target, task) => {
    console.log('task is being scheduled', task.type, task.source);
    return delegate.scheduleTask(target, task);
  },
  onInvokeTask: (delegate, curr, target, task, applyThis, applyArgs) => {
    console.log('task is being invoked', task.type, task.source);
    return delegate.invokeTask(target, task, applyThis, applyArgs);
  },
});
zone.fork({
      name: 'log',
      onInvokeTask: (delegate, curr, target, task, applyThis, applyArgs) => {
        console.log('log in logZone', task.type, task.source);
        return delegate.invokeTask(target, task, applyThis, applyArgs);
      },
    })
    .runGuarded(() => {
      setTimeout(() => {
        console.log('timeout callback is invoked');
      });
    });
