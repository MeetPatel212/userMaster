import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data : any;
  constructor(
     private userData:User,
     private router:Router,
     private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.userData.email==null){
      this.router.navigate(['/Login'])
      }
   this.data = this.userData;
  }
}