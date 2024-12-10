import { Component } from '@angular/core';
import { TodoComponent } from './todo.component';

@Component({
  imports: [TodoComponent],
  selector: 'df-root',
  template: `
    <h1>{{title}}</h1>
    <df-todo /> `,
})
export class AppComponent {
  title = 'To-Do List';
}
