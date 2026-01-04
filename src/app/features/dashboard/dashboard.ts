import { Component } from '@angular/core';
import { InfoCard } from '../../shared/info-card/info-card';
import { supabase } from '../../core/supabase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [InfoCard, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  cards = [
    {
      title: 'Total Tasks',
      value: 4,
      sub: '2 pending',
      color: 'blue',
    },
    {
      title: 'In Progress',
      value: 1,
      sub: 'Active tasks',
      color: 'orange',
    },
    {
      title: 'Completed',
      value: 1,
      sub: '25% completion rate',
      color: 'green',
    },
  ];

  register() {
    this.signup('gauridhakad9893@gmail.com', 'Gauri79@');
  }
  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      console.log(data);

      alert('Registration successful');
    }
  }
  loguser() {
    this.login('gauridhakad9893@gmail.com', 'Gauri79@');
  }
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log(data);

      alert('Login successful');
    }
  }
}
