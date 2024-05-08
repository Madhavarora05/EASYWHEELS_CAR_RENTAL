import { Component, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  locationId : string = '';
  locations: any[] = [];
  carId : string = '';
  carDetails: any;
  ToLocation : string ='';
  fromLocation : string ='';
  bookingObj:any = {
    "bookingId": 0,
  "customerId": 0,
  "fromLocationId": 0,
  "toLocationId": 0,
  "travelDate": "2024-04-29T16:12:59.978Z",
  "startTime": "",
  "carId": 0,
  "pickupAddress": "",
  "alternateContactNo": "",
  "invoiceNo": "",
  "isComplete": true
  }
  loggedUserObj:any;
  constructor(private activateRoute: ActivatedRoute,private carSrv: CarService ){
    this.getAllLocations();
    this.activateRoute.params.subscribe(res=>{
      this.carId = res[`carId`];
      this.locationId = res[`locationId`];
      this.getCarDetails();
      this.bookingObj.carId = this.carId

    })
    const local = localStorage.getItem('User');
      if(local != null){
        this.loggedUserObj = JSON.parse(local);
        this.bookingObj.customerId = this.loggedUserObj.userId
      }
  }
  
  getCarDetails(){
    this.carSrv.GetCarById(this.carId).subscribe((res:any)=>{
        this.carDetails = res.data;
    })
  }
  getAllLocations(){
    this.carSrv.GetAllLocations().subscribe((res:any)=>{
        this.locations= res.data;
    })
  }
  createBooking(){
    this.carSrv.createNewBooking(this.bookingObj).subscribe((res:any)=>{
      if(res.result){
        alert("Booking Success")
      }else{
        alert(res.message);
      }
  })
  }
}
