import { Component , OnInit} from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{

  loggedUserObj: any;
  carList: any[] = [];
  locations: any[] = [
    { locationId: 1, title: 'Location 1' },
    { locationId: 2, title: 'Location 2' },
    // Add more locations as needed
  ];

  carAccesoriesObj : any = {
    "accessoriesId": 0,
    "accessoriesTitle": "",
    "showOnWebsite": false,
    "carId": 0
  }
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
  constructor(private carSrv: CarService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.GetAllLocations();
  }

  loadUserData(): void {
    const local = localStorage.getItem('User');
    if (local !== null) {
      this.loggedUserObj = JSON.parse(local);
      this.getCars();

    } else {
      console.error('User data not found in localStorage');
    }
  }
  
  getCars(){
    this.carSrv.GetAllCarsByOwnerId(this.loggedUserObj.userId).subscribe((res:any)=>{
        this.carList = res.data;
    })
  }
  GetAllLocations(){
    this.carSrv.GetAllLocations().subscribe((res:any)=>{
        this.locations = res.data;
    })
  }
  open() {
    const model = document.getElementById('newCarModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  close() {
    const model = document.getElementById('newCarModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
  Add(){
    const obj = JSON.stringify(this.carAccesoriesObj);
    this.carObj.ZoomCarAccessoriess.push(JSON.parse(obj));
    this.carAccesoriesObj = {
      "accessoriesId": 0,
      "accessoriesTitle": "",
      "showOnWebsite": false,
      "carId": 0
    }
  }
  saveCar(){
    this.carObj.ownerUserId = this.loggedUserObj.userId
    this.carSrv.addNewCar(this.carObj).subscribe((res:any)=>{
      if(res.result){
        alert('Car created')
        this.getCars()
        this.close();
        this.carObj= {
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
      }else{
        alert(res.message)
      }
    })
  }
}
