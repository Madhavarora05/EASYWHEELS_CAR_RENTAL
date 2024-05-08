import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  locationId : string = '';
  locations: any[] = [];
  fromLocation : string ='';
  ToLocation : string ='';
  availaleCars : any[] = [];
  constructor(private activateRoute: ActivatedRoute , private carSrv: CarService , private router : Router){
      this.activateRoute.params.subscribe(res=>{
        debugger;
        this.locationId = res[`locationId`];
      })
  }
  ngOnInit(): void {
      this.getAllLocations();
  }
  getAllLocations(){
    this.carSrv.GetAllLocations().subscribe((res:any)=>{
        this.locations= res.data;
        this.fromLocation = this.locationId
        this.getCarsFromLocation(); 
    })
  }
  getCarsFromLocation(){
    this.carSrv.GetAllCarByLocation(this.locationId).subscribe((res:any)=>{
        this.availaleCars= res.data;
    })
  }
  onLocationChange(){
      this.carSrv.GetAllCarByLocation(this.fromLocation).subscribe((res:any)=>{
      this.availaleCars= res.data;
    })
  }
  makeBooking(carID:number){
      this.router.navigate(['/booking',this.fromLocation , carID])
  }
}
