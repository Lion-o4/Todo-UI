import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from './layout/header/header';
import { Dashboard } from './features/dashboard/dashboard';

export interface Todo {
  id: number;
  text: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Dashboard],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = '';
  isEditing = false;
  editTodoId: number | null = null;

  private http = inject(HttpClient);

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    // GET api call to fetch user todo data
    this.http
      .get<Todo[]>('https://todo-express-backend-vkrq.onrender.com/todos')
      .subscribe((data) => {
        this.todos = data;
      });
  }

  addTodo() {
    if (!this.newTodo.trim()) return;

    this.http
      .post<Todo>('https://todo-express-backend-vkrq.onrender.com/todos', {
        text: this.newTodo,
      })
      .subscribe((res: Todo) => {
        this.newTodo = '';
        this.todos.push(res);
      });
  }
  deleteTodo(id: number) {
    console.log(id);

    this.http
      .delete(`https://todo-express-backend-vkrq.onrender.com/todos/${id}`)
      .subscribe(() => {
        this.todos = this.todos.filter((item: Todo) => item.id !== id);
        console.log(this.todos);
      });
  }
  updateTodo() {
    if (!this.newTodo.trim() || this.editTodoId === null) return;

    this.http
      .put(
        `https://todo-express-backend-vkrq.onrender.com/todos/${this.editTodoId}`,
        {
          text: this.newTodo,
        }
      )
      .subscribe(() => {
        this.newTodo = '';
        this.isEditing = false;
        this.editTodoId = null;
        this.loadTodos();
      });
  }

  startEdit(todo: Todo) {
    this.isEditing = true; // switch to edit mode
    this.editTodoId = todo.id; // store id of todo being edited
    this.newTodo = todo.text; // put text into input box
  }
}
