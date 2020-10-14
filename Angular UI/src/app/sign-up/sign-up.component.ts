import { Component, OnInit, Directive } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  public filepath:any
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  confirmP=true
  error: string;
  isError = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private userData:User
  ) { }
 
  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
            
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender:[''],
      email: ['', [Validators.required,Validators.email]],
      mobileNo: ['', [Validators.required,Validators.pattern('[6-9][0-9]{9}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]],
      address:['',Validators.required],
      city:['',Validators.required]
      
    });
  
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    this.confirmP=true;

    if(this.registerForm.controls.confirmPassword.value!=this.registerForm.controls.password.value){
        this.registerForm.controls.confirmPassword.setValue('')
        this.registerForm.controls.password.setValue('')
    }

    if (this.registerForm.invalid) {
      this.submitted = true;
        return;
    }
   console.log(this.userData);

    this.loading = true;
    this.userData.firstname=this.registerForm.controls.firstname.value;
    this.userData.lastname=this.registerForm.controls.lastname.value;
    this.userData.gender=this.registerForm.controls.gender.value;
    this.userData.email=this.registerForm.controls.email.value;
    this.userData.mobileNo=this.registerForm.controls.mobileNo.value;
    this.userData.password=this.registerForm.controls.password.value;
    this.userData.address=this.registerForm.controls.address.value;
    this.userData.city=this.registerForm.controls.city.value;

    this.userService.register(this.userData)
        .subscribe(
            data => {
              debugger;
                this.router.navigate(['/Login']);
            },
            error => {
              debugger;
              this.isError=true;
              this.error = error.error.data;
              this.loading = false;
            });
}
}
