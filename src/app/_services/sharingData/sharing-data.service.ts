import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private errorDataCreate: Subject<any> = new Subject()
  private searchingData: Subject<any> = new Subject()
  constructor() { }

  sendData(data:any){
    this.errorDataCreate.next(data);
  }

  sendDataSearching(data:any){
    this.searchingData.next(data);
  }

  getData() {
    return this.errorDataCreate.asObservable();
  }

  getDataSearching(){
    return this.searchingData.asObservable();
  }
}
