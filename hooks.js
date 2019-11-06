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
  onCancelTask: (delegate, curr, target, task) => {
    console.log('task is being cancelled', task.type, task.source);
    return delegate.cancelTask(target, task);
  },
  onInvoke(delegate, curr, target, callback, applyThis, applyArgs, source) {
    console.log('callback is being invoked', source);
    return delegate.invoke(target, callback, applyThis, applyArgs);
  }
});
zone.run(() => {
  setTimeout(() => {
    console.log('timeout callback');
  });

  const id = setInterval(() => {
    clearInterval(id);
  });
});

zone.fork({
      name: 'error',
      onHandleError: (delegate, curr, target, error) => {
        if (error.message === 'noThrow') {
          return false;
        }
        return delegate.handleError(target, error);
      }
    })
    .runGuarded(() => {
      throw new Error('noThrow');
    });
