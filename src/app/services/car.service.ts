import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiEndPoint: string = 'http://localhost:4200/api/ZoomCar'; 
  constructor(private http: HttpClient) { }

  registerUser(obj: any) {
    return this.http.post(`${this.apiEndPoint}/AddNewUser`, obj);
  }

  loginUser(obj: any) {
    return this.http.post(`${this.apiEndPoint}/Login`, obj);
  }
  addNewCar(obj: any) {
    return this.http.post(`${this.apiEndPoint}/addNewCar`, obj);
  }

  GetAllCarsByOwnerId(userId: number) {
    return this.http.get(`${this.apiEndPoint}/GetAllCarsByOwnerId?id=${userId}`)
  }
  GetAllLocations() {
    return this.http.get(`${this.apiEndPoint}/GetAllLocations`)
  }
  GetAllCars() {
    return this.http.get(`${this.apiEndPoint}/GetAllCars`)
  }
  GetAllCarByLocation(locationId: string) {
    return this.http.get(`${this.apiEndPoint}/GetAllCarsByLocation?id=${locationId}`)
  }
  GetCarById(carId: string) {
    return this.http.get(`${this.apiEndPoint}/GetCarById?id=${carId}`)
  }
  createNewBooking(obj: any) {
    return this.http.post(`${this.apiEndPoint}/createNewBooking`, obj);
  }
}
