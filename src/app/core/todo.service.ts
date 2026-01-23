import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  addTask() {}
  deleteTask() {}
}
