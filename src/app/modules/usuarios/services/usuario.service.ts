import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioRequest } from '../models/usuario-request.model';
import { UsuarioResponse } from '../models/usuario-response.model';
import {environment} from '../../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  // =========================
  // CREAR USUARIO
  // =========================
  crear(usuario: UsuarioRequest) {
    return this.http.post<UsuarioResponse>(`${this.API}/crear`, usuario);
  }

  // =========================
  // LISTAR USUARIOS
  // =========================
  listar() {
    return this.http.get<UsuarioResponse[]>(`${this.API}/listar`);
  }

  // =========================
  // OBTENER POR ID
  // =========================
  obtenerPorId(id: number) {
    return this.http.get<UsuarioResponse>(`${this.API}/${id}`);
  }

  // =========================
  // ACTUALIZAR
  // =========================
  actualizar(id: number, usuario: UsuarioRequest) {
    return this.http.put<UsuarioResponse>(`${this.API}/${id}`, usuario);
  }

  // =========================
  // ELIMINAR
  // =========================
  eliminar(id: number) {
    return this.http.delete<string>(`${this.API}/${id}`);
  }

}

