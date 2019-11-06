const testObj = {
  testFunc: function() {
    console.log('this in testFunc is:', this);
  }
};

testObj.testFunc();

const newTestFunc = testObj.testFunc;
newTestFunc();

const newObj = {};

newTestFunc.apply(newObj);