import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingDataService } from './_services/sharingData/sharing-data.service';
import { Subject, takeUntil } from 'rxjs';
import { AccessApiService } from './_services/access-api.service';
import { registrasi } from './models/registrasi.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;
  isMenuMobile: boolean = false;
  isNotif: boolean = false;
  typeNotif: boolean = false;
  notif: string = "";
  private sub: Subject<void> = new Subject();
  constructor(
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    private sharing: SharingDataService,
    private api: AccessApiService
  ) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        (state.matches) ? this.isMobile = true : this.isMobile = false;
      })
    this.sharing.getData().subscribe({
      next: (data) => this.actionNotif(data)
    })
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

  actionNotif(data: any) {
    console.log(data, data.status);
    
    this.typeNotif = data.status == undefined ?  true:false;
    this.isNotif = !this.isNotif;
    this.notif = data.status == undefined ? data.message : data.error.message;
    setTimeout(() => { this.isNotif = !this.isNotif }, 2000)
  }

  goToComponentAside() {
    this.isMenuMobile = !this.isMenuMobile
  }
  goToPageDaftar() {
    this.router.navigate(['/daftar']);
  }

  onSubmitSearchingData(event: any) {
    if (event.target.value !== "") {
      this.api.searching('search-registration', event.target.value)
        .pipe(
          takeUntil(this.sub))
        .subscribe({
          next: (res) => {
            this.sharing.sendDataSearching(res.data);
          },
          error: (err) => console.log(err)
        })
    }

  }
}
