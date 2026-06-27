import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ArticuloResponse} from '../models/articulo-response.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private API = `${environment.apiUrl}/api/articulo`;

  constructor(private http: HttpClient) {
  }

  //CREAR
  crear(data: any): Observable<any> {
    return this.http.post(`${this.API}/crear`, data);
  }

  //LISTAR TODOS
  listar(): Observable<ArticuloResponse[]> {
    return this.http.get<ArticuloResponse[]>(`${this.API}/listar`);
  }

  //LISTAR POR CATEGORÍA
  listarPorCategoria(categoria: string): Observable<ArticuloResponse[]> {
    return this.http.get<ArticuloResponse[]>(`${this.API}/listar/categoria/${categoria}`);
  }

  //OBTENER POR ID
  obtenerPorId(id: number): Observable<ArticuloResponse> {
    return this.http.get<ArticuloResponse>(`${this.API}/listar/${id}`);
  }

  //OBTENER POR SLUG
  obtenerPorSlug(slug: string): Observable<ArticuloResponse> {
    return this.http.get<ArticuloResponse>(`${this.API}/listar/slug/${slug}`);
  }

  //OBTENER CATEGORIA + SLUG
  obtenerPorCategoriaSlug(categoria: string, slug: string): Observable<ArticuloResponse> {
    return this.http.get<ArticuloResponse>(`${this.API}/${categoria}/${slug}`);
  }

  //ACTUALIZAR
  actualizar(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API}/actualizar/${id}`, data);
  }

  //ELIMINAR
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API}/eliminar/${id}`);
  }
}
