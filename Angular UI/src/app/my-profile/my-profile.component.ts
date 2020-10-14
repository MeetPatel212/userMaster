import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { User } from '../user';
// import {NavigationComponent} from '../shared/header-navigation/navigation.component';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userData: any;
  submitted: boolean;
  updateProfile: any;
  error: string;
  isError = false;

  constructor(private router:Router,
    private userService:UserService,
    private userUpdateData:User,
    ) { }

  ngOnInit() {

    this.submitted=false
    if(this.userUpdateData.email==null){
      this.router.navigate(['/Login'])
      }
     
    this.updateProfile=new FormGroup({
      firstname: new FormControl(this.userUpdateData.firstname, [Validators.required]),
      lastname: new FormControl(this.userUpdateData.lastname, [Validators.required]),
      gender: new FormControl(this.userUpdateData.gender, [Validators.required]),
      email:new FormControl(this.userUpdateData.email),
      mobileNo:new FormControl(this.userUpdateData.mobileNo,[Validators.required,Validators.pattern('[6-9][0-9]{9}')]),
      address:new FormControl(this.userUpdateData.address,[Validators.required]),
      city:new FormControl(this.userUpdateData.city,[Validators.required])

    })
  

  }
 
  onSubmit(){
    
    this.submitted=true
    debugger;
    if(this.updateProfile.invalid){
         return
    }
    
    this.userUpdateData.firstname=this.updateProfile.controls.firstname.value;
    this.userUpdateData.lastname=this.updateProfile.controls.lastname.value;
    this.userUpdateData.gender=this.updateProfile.controls.gender.value;
    this.userUpdateData.email=this.updateProfile.controls.email.value;
    this.userUpdateData.mobileNo=this.updateProfile.controls.mobileNo.value;
    this.userUpdateData.address=this.updateProfile.controls.address.value;
    this.userUpdateData.city=this.updateProfile.controls.city.value;
    this.userUpdateData.email= this.updateProfile.controls.email.value;
    this.userService.updateUser(this.userUpdateData)
    .subscribe(data=>{
      debugger;
      this.router.navigate(['/Dashboard']);

    },error=>{
      debugger;
      this.isError=true;
      this.error = error.error.data;
      if(this.error=="Invalid Token or Token Expired"){
        this.router.navigate(['/Login']);
      }
    }
    )
   
  }
  reset(){
    this.ngOnInit()
  }

}
