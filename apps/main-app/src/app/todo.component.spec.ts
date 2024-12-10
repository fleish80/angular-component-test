import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TodoComponent],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Integration tests

  it('should add a new task to the list', () => {
    const inputElement = debugElement.query(By.css('input')).nativeElement;
    const addButton = debugElement.query(By.css('button')).nativeElement;

    inputElement.value = 'Test Task';
    inputElement.dispatchEvent(new Event('input'));
    addButton.click();
    fixture.detectChanges();

    const taskElements = debugElement.queryAll(By.css('li'));
    expect(taskElements.length).toBe(1);
    expect(taskElements[0].nativeElement.textContent).toContain('Test Task');
  });

  it('should toggle task completion', () => {
    component.newTask.setValue('Test Task');
    component.addTask();
    fixture.detectChanges();

    const toggleButton = debugElement.query(By.css('li button')).nativeElement;
    toggleButton.click();
    fixture.detectChanges();

    const taskElement = debugElement.query(By.css('li span')).nativeElement;
    expect(taskElement.classList).toContain('completed');
  });

  it('should remove a task from the list', () => {
    component.newTask.setValue('Test Task');
    component.addTask();
    fixture.detectChanges();

    const removeButton = debugElement.queryAll(By.css('li button'))[1].nativeElement;
    removeButton.click();
    fixture.detectChanges();

    const taskElements = debugElement.queryAll(By.css('li'));
    expect(taskElements.length).toBe(0);
  });

  // End of integration tests

  // Unit tests

  it('should add a new task', () => {
    component.newTask.setValue('Test Task');
    component.addTask();
    fixture.detectChanges();

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].name).toBe('Test Task');
  });

  it('should toggle task completion', () => {
    component.newTask.setValue('Test Task');
    component.addTask();
    fixture.detectChanges();

    component.toggleComplete(0);
    fixture.detectChanges();

    expect(component.tasks[0].completed).toBeTrue();
  });

  it('should remove a task', () => {
    component.newTask.setValue('Test Task');
    component.addTask();
    fixture.detectChanges();

    component.removeTask(0);
    fixture.detectChanges();

    expect(component.tasks.length).toBe(0);
  });

  // End of unit tests
});
