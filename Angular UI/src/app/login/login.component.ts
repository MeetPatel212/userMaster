import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  tokenKey:any
  returnData:any
  error: string;
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private userData:User
  ) { }

  ngOnInit() {    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  
  }

  get f() { return this.loginForm.controls; }

    id:any
    fullName:any
    active:any

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.loading = true;
      this.userService.login(this.f.email.value, this.f.password.value)
          .subscribe(
            data => {
              debugger;
              this.userData.firstname=data["data"].userdata.firstname;
              this.userData.lastname=data["data"].userdata.lastname;
              this.userData.gender=data["data"].userdata.gender;
              this.userData.email=data["data"].userdata.email;
              this.userData.mobileNo=data["data"].userdata.mobileNo;
              this.userData.password=data["data"].userdata.password;
              this.userData.address=data["data"].userdata.address;
              this.userData.city=data["data"].userdata.city;
              this.userData.token = data["data"].token;
                this.router.navigate(['/Dashboard']);
            },
            error => {
              debugger;
              this.isError=true;
              this.error = error.error.data.message;
              this.loading = false;
            });
  }

    
}
