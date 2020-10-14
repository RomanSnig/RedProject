import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AdminServiceService} from '../../../services/admin-service.service';
import {Admin} from '../../../models/Admin';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-status1',
  templateUrl: './status1.component.html',
  styleUrls: ['./status1.component.css']
})
export class Status1Component implements OnInit {
admin: Admin[] = [{
  _id: '',
  name: '',
  surname: '',
  email: '',
  status: null,
  phone: '',
  rights: null,
  changeForm: false
}];
  constructor(private http: HttpClient,
              private dataService: AdminServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.admins();
  }
  admins(): void {
    this.dataService.findAdmins('1').subscribe((res: Admin[]) => {
      this.admin = res;
      console.log(this.admin);
    });
  }
  changeData(editAdmin: Admin): Subscription {
    return this.dataService.changeAdminData(editAdmin).subscribe((changedAdmin: any) => {
      console.log('*********');
      console.log(changedAdmin);
      console.log('*********');
      // localStorage.setItem('admin', JSON.stringify(changedAdmin));
      this.editButton(editAdmin._id);
      this.admins();
      if (changedAdmin === 'Admin is already created with email: ' + editAdmin.email) {
        alert(changedAdmin);
      }
    },  error => {
      console.log(error);
      alert(error.error.message);
    });
  }
  editButton(adminID): void {
    this.admin.forEach(person => {
      if (person._id === adminID) {
        console.log(person);
        return person.changeForm = !person.changeForm;
      }});
    console.log(adminID);
  }
}
