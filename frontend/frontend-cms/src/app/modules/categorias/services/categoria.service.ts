import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Categoria} from '../models/categoria.model';
import {environment} from '../../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private API = `${environment.apiUrl}/api/categoria`;

  constructor(private http: HttpClient) {
  }

  // LISTAR (ajustado a tu backend)
  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.API}/listar`);
  }

  // OBTENER POR ID (opcional para futuro)
  obtenerPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API}/${id}`);
  }

  // CREAR (para futuras pantallas admin)
  crear(data: { nombre: string; descripcion: string }): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.API}/crear`, data);
  }

  // ELIMINAR (opcional)
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/eliminar/${id}`);
  }

}
