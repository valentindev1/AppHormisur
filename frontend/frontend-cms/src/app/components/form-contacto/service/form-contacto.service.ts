import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private API = `${environment.apiUrl}/api/contacto`;

  constructor(private http: HttpClient) {}

  // ENVIAR FORMULARIO DE CLIENTE
  enviar(data: any): Observable<any> {
    return this.http.post(`${this.API}/cliente`, data);
  }

}
