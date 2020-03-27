export class Task {
  _id: string;
  description: string = '';
  completed: boolean = false;
  owner: number = null;
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
