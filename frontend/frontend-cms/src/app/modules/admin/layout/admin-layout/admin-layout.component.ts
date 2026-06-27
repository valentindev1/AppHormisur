import {Component} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  // Importamos las directivas de router para que funcionen los enlaces y el outlet
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  // Aquí puedes añadir lógica común del layout, como manejar un menú colapsable
  isSidebarOpen: boolean = true;


  constructor(
    private authService: AuthService,
    private router: Router,
    private metaService: Meta
  ) {
  }

  ngOnInit(): void {
    this.metaService.updateTag({name: 'robots', content: 'noindex, nofollow'});
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // LOGOUT

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], {replaceUrl: true});
  }


}
