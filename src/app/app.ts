import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from './layout/header/header';
export interface Todo {
  id: number;
  text: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';
  isEditing: boolean = false;
  editTodoId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    // GET api call to fetch user todo data
    this.http.get<any[]>('http://localhost:3000/todos').subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo() {
    if (!this.newTodo.trim()) return;

    this.http
      .post('http://localhost:3000/todos', {
        text: this.newTodo,
      })
      .subscribe((res: any) => {
        this.newTodo = '';
        this.todos.push(res);
      });
  }
  deleteTodo(id: number) {
    console.log(id);

    this.http
      .delete(`http://localhost:3000/todos/${id}`)
      .subscribe((res: any) => {
        this.todos = this.todos.filter((item: Todo) => item.id !== id);
        console.log(this.todos);
      });
  }
  updateTodo() {
    if (!this.newTodo.trim() || this.editTodoId === null) return;

    this.http
      .put(`http://localhost:3000/todos/${this.editTodoId}`, {
        text: this.newTodo,
      })
      .subscribe(() => {
        this.newTodo = '';
        this.isEditing = false;
        this.editTodoId = null;
        this.loadTodos();
      });
  }

  startEdit(todo: any) {
    this.isEditing = true; // switch to edit mode
    this.editTodoId = todo.id; // store id of todo being edited
    this.newTodo = todo.text; // put text into input box
  }
}
