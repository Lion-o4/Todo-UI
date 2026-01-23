import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoCard } from '../../shared/info-card/info-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, InfoCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // --------------------
  // UI STATE
  // --------------------
  showModal = false;

  // --------------------
  // TASK DATA
  // --------------------
  tasks: Task[] = [];

  newTask: Task = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    completed: false,
  };

  // --------------------
  // DERIVED METRICS (LOGIC)
  // --------------------
  get totalTasks() {
    return this.tasks.length;
  }

  get completedTasks() {
    return this.tasks.filter((t) => t.completed).length;
  }

  get inProgressTasks() {
    return this.tasks.filter((t) => !t.completed).length;
  }

  get pendingTasks() {
    return this.totalTasks - this.completedTasks;
  }

  get completionRate() {
    if (this.totalTasks === 0) return 0;
    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

  // --------------------
  // ACTIONS
  // --------------------
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createTask() {
    this.tasks.unshift({ ...this.newTask });

    this.newTask = {
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      completed: false,
    };

    this.closeModal();
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }
}

// --------------------
// TASK TYPE
// --------------------
interface Task {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  completed: boolean;
}
