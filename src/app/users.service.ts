import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getData()
  { 
    let access_key = "eb588dbf70cb81df1c8d374269db9d18"
    let number = "12345678"
    let url="https://apilayer.net/api/validate?access_key=" + access_key + "&number=" + number;
    return this.http.get(url);

  }
}
