import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { supabase } from '../../core/supabase';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  showMenu = false;

  user = {
    name: '',
    email: '',
    initials: '',
  };

  constructor(private router: Router) {}

  async ngOnInit() {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.email) {
      this.user.email = data.user.email;
      this.user.name = data.user.email.split('@')[0];
      this.user.initials = this.user.name.slice(0, 2).toUpperCase();
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  async logout() {
    await supabase.auth.signOut();
    this.showMenu = false;
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile')) {
      this.showMenu = false;
    }
  }
}
