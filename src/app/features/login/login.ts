import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from '../../core/supabase';

export interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isNewUser = false;
  user: User = {
    email: '',
    password: '',
  };

  private router = inject(Router);

  async onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;

    if (this.isNewUser) {
      await this.signup(email, password);
    } else {
      await this.login(email, password);
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    console.log('Login success:', data);
    alert('Login successful');
    this.router.navigate(['/dashboard']);
  }

  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    console.log('Signup success:', data);
    alert('Registration successful');
    this.isNewUser = false;
  }
}
