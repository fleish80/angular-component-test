import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'df-todo',
  imports: [ReactiveFormsModule, MatButton, MatFormField, MatInput, MatLabel],
  template: `
    <div class="todo">
      <mat-form-field>
        <mat-label>Add a new task</mat-label>
        <input [formControl]="newTask" matInput />
      </mat-form-field>
      <button (click)="addTask()" mat-raised-button class="add-task-btn">Add Task</button>
    </div>
      <ul class="tasks-list">
        @for (task of tasks; track task.name; let i = $index) {
        <li class="task-item">
          <span [class.completed]="task.completed">{{ task.name }}</span>
          <button (click)="toggleComplete(i)" mat-raised-button>Toggle Complete</button>
          <button (click)="removeTask(i)" mat-raised-button>Remove</button>
        </li>
        }
      </ul>
  `,
  styles: [
    `
      :host {
        display: block;
        flex-direction: column;
      }

      .todo {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px;
      }

      .add-task-btn {
        transform: translateY(-8px);
      }

      .tasks-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .task-item {
        display: flex;
        align-items: center;
        gap: 5px;
      }


      .completed {
        text-decoration: line-through;
        color: gray;
      }
    `,
  ],
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
