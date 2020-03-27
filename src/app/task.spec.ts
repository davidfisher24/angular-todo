import { Task } from './task';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new Task({
      description: 'New task',
      completed: false,
      owner: 1,
    });
    expect(todo.description).toEqual('New task');
    expect(todo.completed).toEqual(false);
    expect(todo.owner).toEqual(1);
  });
});
