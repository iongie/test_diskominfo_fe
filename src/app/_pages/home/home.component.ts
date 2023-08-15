import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccessApiService } from 'src/app/_services/access-api.service';
import { SharingDataService } from 'src/app/_services/sharingData/sharing-data.service';
import { registrasi } from 'src/app/models/registrasi.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  limit: number = 50
  offset: number = 0
  disableAdd: boolean = false;
  disableReduce: boolean = false;
  dataRegistrasi: registrasi[] = [];
  totalDataRegistrasi: number = 0
  private subs: Subject<void> = new Subject()
  constructor(
    private router: Router,
    private api: AccessApiService,
    private sharing: SharingDataService
  ) { }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

  ngOnInit(): void {
    this.sharing.getDataSearching().subscribe({
      next: (res)=> this.dataRegistrasi = res
    });
    this.totalData('total-registration');
    this.getData('read-registration', this.limit, this.offset);
  }

  goToPageDaftar(){
    this.router.navigate(['/daftar']);
  }

  getData(pageUrl: string, limit: number, offset: number) {
    this.api.read(pageUrl, limit, offset)
      .pipe(
        takeUntil(this.subs))
      .subscribe({
        next: (res) => this.dataRegistrasi = res.data,
        error: (err) => console.log(err)

      })
  }

  totalData(pageUrl: string) {
    this.api.totalData(pageUrl)
      .pipe(
        takeUntil(this.subs))
      .subscribe((res) => {
        this.totalDataRegistrasi = res.data
      })
  }

  add() {
    if ((this.offset + this.limit) < this.totalDataRegistrasi) {
      this.getData('read-registration', this.limit, this.offset += this.limit)
    }
  }

  reduce() {
    if (this.offset > 0) {
      this.getData('read-registration', this.limit, this.offset -= this.limit)
    }
  }

  reload() {
    this.getData('read-registration', this.limit = 50, this.offset = 0)
  }
}
