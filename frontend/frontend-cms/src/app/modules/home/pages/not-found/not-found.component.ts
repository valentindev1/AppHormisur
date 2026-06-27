import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    // Título de la pestaña
    this.titleService.setTitle('Página no encontrada | Hormigones Del Sur');

    // Le decimos a los robots que NO indexen esta página de error
    this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
