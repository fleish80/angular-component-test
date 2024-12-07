import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'df-todo',
  template: `
    <div>
      <h1>To-Do List</h1>
      <input [formControl]="newTask" placeholder="Add a new task" />
      <button (click)="addTask()">Add Task</button>
      <ul>
        @for (task of tasks; track task.name; let i = $index) {
        <li>
          <span [class.completed]="task.completed">{{ task.name }}</span>
          <button (click)="toggleComplete(i)">Toggle Complete</button>
          <button (click)="removeTask(i)">Remove</button>
        </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .completed {
        text-decoration: line-through;
        color: gray;
      }
    `,
  ],
  imports: [ReactiveFormsModule],
})
export class TodoComponent {
  tasks: { name: string; completed: boolean }[] = [];

  newTask = new FormControl('');

  addTask() {
    if (this.newTask.value) {
      this.tasks.push({ name: this.newTask.value, completed: false });
      this.newTask.setValue('');
    }
  }

  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
