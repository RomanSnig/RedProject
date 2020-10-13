import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../models/Admin';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }
  findAdmins(status) {
    return this.http.get('http://localhost:3000/admin/find/' + status);
  }
  changeAdminData(a: Admin): Observable<Admin> {
    return this.http.put<Admin>('http://localhost:3000/admin/changeData', a);
  }
}
