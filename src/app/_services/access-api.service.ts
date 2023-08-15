import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessApiService implements OnDestroy {
  private subs: Subject<void> = new Subject();
  private _refresh: Subject<void> = new Subject();
  private url:string = "http://localhost:8080/";
  constructor(
    private http: HttpClient,
  ) { }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

  get refresh() {
    return this._refresh;
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => error)
  }

  create(data:any, pageUrl: string):Observable<any>{
    return this.http.post<any>(this.url+pageUrl, data,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError),
      tap(()=>{
          this._refresh.next();
      })
    )
  }

  read(pageUrl: string, limit:number, offset: number):Observable<any>{
    return this.http.get<any>(this.url+pageUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: new HttpParams().set('limit', limit.toString()).set('offset', offset.toString())
    }).pipe(
      catchError(this.handleError)
    );
  }

  searching(pageUrl: string, like:any):Observable<any>{
    return this.http.get<any>(this.url+pageUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: new HttpParams().set('like', like.toString())
    }).pipe(
      catchError(this.handleError)
    );
  }

  totalData(pageUrl: string):Observable<any>{
    return this.http.get<any>(this.url+pageUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      catchError(this.handleError)
    );
  }
}
