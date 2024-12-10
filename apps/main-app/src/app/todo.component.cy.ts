/// <reference types="cypress" />
import { mount } from 'cypress/angular';
import { TodoComponent } from './todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('TodoComponent', () => {
  beforeEach(() => {
    mount(TodoComponent, {
      imports: [ReactiveFormsModule],
      providers: [provideAnimations()]
    });
  });



  it('should add a new task to the list', () => {
    cy.get('input').type('Test Task', { force: true });
    cy.get('button').contains('Add Task').click();
    cy.get('ul').find('li').should('have.length', 1).and('contain.text', 'Test Task');
  });

  it('should toggle task completion', () => {
    cy.get('input').type('Test Task', { force: true });
    cy.get('button').contains('Add Task').click();
    cy.get('ul').find('li').first().find('button').contains('Toggle Complete').click();
    cy.get('ul').find('li').first().find('span').should('have.class', 'completed');
  });

  it('should remove a task from the list', () => {
    cy.get('input').type('Test Task', { force: true });
    cy.get('button').contains('Add Task').click();
    cy.get('ul').find('li').first().find('button').contains('Remove').click();
    cy.get('ul').find('li').should('have.length', 0);
  });
});
