import { Component , OnInit} from '@angular/core';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
    popularCars: any[] = [];
    locations: any[] = [];
    fromLocation : string ='';
    ToLocation : string ='';
    carObj: any = {
      "carId": 0,
      "brand": "",
      "name": "",
      "pricingDescription": "",
      "pricing": 0,
      "locationId": 0,
      "registeredOn": new Date(),
      "imageUrl": "",
      "vehicleNo": "",
      "ownerUserId": 0,
      "ZoomCarAccessoriess": [
      ]
    }

    constructor(private carSrv: CarService,private router:Router){

    }
    ngOnInit(): void {
        this.getAllCars();
        this.getAllLocations();
    }
    getAllCars(){
      this.carSrv.GetAllCars().subscribe((res:any)=>{
          this.popularCars = res.data;
      })
    }
    getAllLocations(){
      this.carSrv.GetAllLocations().subscribe((res:any)=>{
          this.locations= res.data;
      })
    }
    navigateToSearchPage(){
        this.router.navigate(['/search' , this.fromLocation])
    }
}
