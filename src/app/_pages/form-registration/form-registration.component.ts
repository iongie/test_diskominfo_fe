import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccessApiService } from 'src/app/_services/access-api.service';
import { SharingDataService } from 'src/app/_services/sharingData/sharing-data.service';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.css']
})
export class FormRegistrationComponent implements OnInit , OnDestroy {
  registrations = new FormGroup({
    name: new FormControl({value: "", disabled: false}, Validators.requiredTrue),
    email: new FormControl({value: "", disabled: false}, [Validators.requiredTrue, Validators.email]),
    alamat: new FormControl({value: "", disabled: false}, Validators.requiredTrue),
  });
  private subs: Subject<void> = new Subject();
  constructor(
    private router: Router,
    private api: AccessApiService,
    private sharing: SharingDataService
  ){}

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

  ngOnInit(): void {
    
  }

  goBackToHome(){
    this.router.navigate(['/'])
  }
  

  onSubmit(){
    this.api.create(this.registrations.value, 'create-registration')
    .pipe(
      takeUntil(this.subs))
    .subscribe({
      next: (res)=> {
        this.sharing.sendData(res);
        setTimeout(() => { this.router.navigate(['/']) }, 3000)
        
      },
      error: (err)=> {
        this.sharing.sendData(err)
      }
    })
  }
}
