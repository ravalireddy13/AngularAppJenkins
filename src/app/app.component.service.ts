import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppComponentService {
  constructor(private httpClient: HttpClient) {}
  addUser(data: any) {
    console.log("data",data)
    return this.httpClient.post<any>(`http://localhost:8080/api/users`, data);
  }
}