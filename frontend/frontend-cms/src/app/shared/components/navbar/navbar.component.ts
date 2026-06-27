import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [CommonModule, RouterModule, NgOptimizedImage]
})
export class NavbarComponent {

  constructor(public auth: AuthService, private router: Router) {}


  get isLoggedIn(): boolean {
    return this.auth.isLogged();
  }

  openDropdown = false;
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  cerrarMenu() {
    const navbar = document.getElementById('navbarNav');

    if (navbar) {
      const collapseInstance = (window as any).bootstrap.Collapse.getInstance(navbar)
        || new (window as any).bootstrap.Collapse(navbar);

      collapseInstance.hide();
    }

    // ✅ asegurar scroll arriba
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

}
