import { Component, OnInit } from '@angular/core';
import {Admin} from '../../../models/Admin';
import {HttpClient} from '@angular/common/http';
import {AdminServiceService} from '../../../services/admin-service.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-status2',
  templateUrl: './status2.component.html',
  styleUrls: ['./status2.component.css']
})
export class Status2Component implements OnInit {
  admin: Admin[] = [{
    _id: '',
    name: '',
    surname: '',
    email: '',
    status: null,
    phone: '',
    rights: null
  }];
  adminChange = false;
  constructor(private http: HttpClient,
              private dataService: AdminServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.admins();
  }
  admins(): void {
    this.dataService.findAdmins('2').subscribe((res: Admin[]) => {
      this.admin = res;
      console.log(this.admin);
    });
  }
  changeData(editAdmin: Admin): Subscription {
    console.log(editAdmin);
    return this.dataService.changeAdminData(editAdmin).subscribe((changedAdmin: Admin) => {
      console.log('*********');
      console.log(changedAdmin);
      console.log('*********');
      // localStorage.setItem('admin', JSON.stringify(changedAdmin));
      this.adminChange = !this.adminChange;
      this.admins();
    },  error => {
      console.log(error);
      alert(error.error.msg);
    });
  }
  editButton(): void {
    this.adminChange = !this.adminChange;
  }
}
