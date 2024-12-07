import { Component } from '@angular/core';
import { TodoComponent } from './todo.component';

@Component({
  imports: [TodoComponent],
  selector: 'df-root',
  template: ` <df-todo /> `,
})
export class AppComponent {
  title = 'main-app';
}
