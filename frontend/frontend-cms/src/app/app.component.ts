import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    TopbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {

    // ✅ SOLO EJECUTA EN NAVEGADOR
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarCookieConsent();
    }

  }

  iniciarCookieConsent() {

    // ✅ IMPORT DINÁMICO (CLAVE PARA SSR)
    import('vanilla-cookieconsent').then((CookieConsent) => {

      CookieConsent.run({

        language: {
          default: 'es',
          translations: {
            es: {
              consentModal: {
                title: 'Creemos que sus datos son de su propiedad',
                description: 'Para ofrecerle la mejor experiencia en Hormigones del Sur, utilizamos cookies.',
                acceptAllBtn: 'Aceptar todas',
                acceptNecessaryBtn: 'Solo necesarias',
                showPreferencesBtn: 'Personalizar'
              },
              preferencesModal: {
                title: 'Preferencias de consentimiento',
                acceptAllBtn: 'Aceptar todas',
                acceptNecessaryBtn: 'Solo necesarias',
                savePreferencesBtn: 'Guardar mis preferencias',
                closeIconLabel: 'Cerrar modal',
                sections: [
                  {
                    title: 'Operaciones básicas',
                    description: 'Necesarias para el funcionamiento del sitio.',
                    linkedCategory: 'necessary'
                  },
                  {
                    title: 'Analítica',
                    description: 'Ayuda a mejorar el sitio web.',
                    linkedCategory: 'analytics'
                  }
                ]
              }
            }
          }
        },

        categories: {
          necessary: {
            readOnly: true,
            enabled: true
          },
          analytics: {
            enabled: false
          }
        }

      });

    });

  }

  title = 'frontend-cms';
}
