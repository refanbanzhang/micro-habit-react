const { getOrder } = require('./index'); // Assuming the function is exported from index.js

describe('getOrder', () => {
  it('should return half of the first task position when endIndex is 0', () => {
    const tasks = [{ position: 20 }, { position: 30 }, { position: 40 }];
    const result = getOrder(tasks, 0);
    expect(result).toBe(10);
  });

  it('should return the last task position plus 10 when endIndex is the last index', () => {
    const tasks = [{ position: 20 }, { position: 30 }, { position: 40 }];
    const result = getOrder(tasks, tasks.length - 1);
    expect(result).toBe(50);
  });

  it('should return the average of the positions of the task at endIndex and the task before it when endIndex is not 0 or the last index', () => {
    const tasks = [{ position: 20 }, { position: 30 }, { position: 40 }];
    const result = getOrder(tasks, 1);
    expect(result).toBe(25);
  });
});