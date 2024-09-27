import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  title = 'lucalify-app';

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if(!theme) {
      localStorage.setItem('theme', 'light');
    }
    this.setTheme(localStorage.getItem('theme') || 'light');
  }

  private setTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
