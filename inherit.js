class Zone {
  constructor(parentZone, name) {
    this.parent = parentZone;
    this.name = name;
  }
  run(fn) {
    Zone.current = this;
    fn.apply(this);
  }
}


// At design time it is not possible to know which zone will
// be the parent zone. As a consequence, a parent zone has to
// be passed into the constructor.
class TimingZone extends Zone {
  constructor(parent) {
    super(parent, 'timingZone');
  }

  // We would like to intercept the run, and so we overwrite it.
  run() {
    // Capture the start time
    var start = Date.now();
    // It may appear that calling super.run() is the right thing
    // to do at this point, but the super.run(), internally must
    // invoke parent.run. So super.run is just a red herring,
    // and we should rather understand what are the consequences
    // of parent.run(). See next example.
    super.run(...arguments);
    // Capture the end time
    var end = Date.now();
    // Print the duration, and the current zone.
    console.log(this.name, 'Duration:', end - start);
  }
}

// At design time it is not possible to know which zone will
// be the parent zone. As a consequence, a parent zone has to
// be passed into the constructor.
class LogZone extends Zone {
  constructor(parent) {
    super(parent, 'logZone');
  }

  run() {
    // log the zone name and 'enter'
    console.log(this.name, 'enter');
    // The issue with calling parent.run, is that it will cause the
    // current zone to be changed to the parent zone.
    // What we need is a way of calling the parent run hooks, without
    // changing the current zone.
    this.parent.run(...arguments);
    // log the zone name and 'leave'
    console.log(this.name, 'leave');
  }
}


// Compose several zones.
let rootZone = Zone.current;
let timingZone = new TimingZone(rootZone);
let logZone = new LogZone(timingZone);

logZone.run(() => {
  console.log(Zone.current.name, 'Hello World!');
});
