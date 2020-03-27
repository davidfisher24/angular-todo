import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import {TaskDataService} from './task-data.service';
import {Task} from './task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskDataService, MatDialog],
})
export class AppComponent {

  private readonly onDestroy = new Subject<void>();

  private newTask: Task = new Task();
  private filterOption: string = 'all';
  private tasks: Task[];
  private displayedTasks: Task[];

  constructor(private taskDataService: TaskDataService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.displayedTasks = []
    this.getTasks()
  }

  getTasks() {
    this.taskDataService.getTasks().pipe(takeUntil(this.onDestroy)).subscribe((tasks: Task[]) => {
        this.tasks = tasks
        this.setDisplayedTasks()
    })
  }

  createTask() {
    this.taskDataService.createTask(this.newTask).subscribe((task: Task) => {
      this.getTasks()
      this.newTask = new Task();
    });
  }

  updateTask(data, id: string) {
    console.log(data)
    this.taskDataService.updateTask(data, id).subscribe((task: Task) => {
      this.getTasks()
    });
  }

  deleteTask(task: Task) {
    this.taskDataService.deleteTask(task._id).pipe(takeUntil(this.onDestroy)).subscribe((task: Task) => {
      this.getTasks()
    });
  }

  toggleTaskCompleted(task) {
    const data = { completed: !task.completed }
    this.taskDataService.updateTask(data,task._id).pipe(takeUntil(this.onDestroy)).subscribe((task: Task) => {
      this.getTasks()
    });
  }

  setDisplayedTasks() {
    if (this.filterOption === 'all') this.displayedTasks = this.tasks
    if (this.filterOption === 'pending') this.displayedTasks = this.tasks.filter(t => !t.completed)
    if (this.filterOption === 'completed') this.displayedTasks = this.tasks.filter(t => t.completed)
  }

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {
        description: task.description
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.updateTask(data, task._id)
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

}
