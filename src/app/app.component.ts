import { Component } from '@angular/core';
import { CarService } from './services/car.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyWheels';
  locations: any[] = [];
  fromLocation : string ='';
  ToLocation : string ='';
  carId : string = '';

  registerObj: any = {
    userId: 0,
    name: "",
    userRole: "",
    emailId: "",
    mobileNo: "",
    password: "",
    createdOn: new Date()
  };
  loginObj: any = {
    userId: 0,
    name: "111",
    userRole: "111",
    emailId: "",
    mobileNo: "111",
    password: "",
    createdOn: new Date()
  };

  loggedUserObj:any;

  // constructor(private activateRoute: ActivatedRoute,private carSrv : CarService,private router:Router){
  //   this.activateRoute.params.subscribe(res=>{
  //     this.carId = res[`carId`];
  //   })
  //     const local = localStorage.getItem('User');
  //     if(local != null){
  //       this.loggedUserObj = JSON.parse(local);
  //     }

  // }
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private carSrv: CarService , private activateRoute: ActivatedRoute,private router:Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onRegister(){
    debugger;
    this.carSrv.registerUser(this.registerObj).subscribe((res:any)=>{
        if(res.result){
          alert('Registration Success')
          this.closeRegister();
          this.loggedUserObj = res.data;
        }else{
          alert(res.message)
        }
    })
  }
  
  openRegister() {
    const model = document.getElementById('registerModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeRegister() {
    const model = document.getElementById('registerModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
  onLogin(){
    debugger;
    this.carSrv.loginUser(this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert('Login Success');
        localStorage.setItem('User' , JSON.stringify(res.data));
        this.closeLogin();
        this.loggedUserObj = res.data;
      }else{
        alert(res.message)
      }
    })
  }
  logout(){
    localStorage.removeItem("User");
    this.loggedUserObj = undefined; 
  }
  openLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
  navigateToSearchPage(){
    this.router.navigate(['/search' , this.fromLocation])
}
navigateTobookingpage(){
  this.router.navigate(['/booking' , this.fromLocation , this.carId])
}
}
