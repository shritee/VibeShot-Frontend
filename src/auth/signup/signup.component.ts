import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SharedModule } from '../../shared/shared.module';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  handleMonth: any;
  handleDate: any;
  handleYear: any;
  loader: boolean=false;
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {
    this.signUpForm = this.fb.group({
      email: [''],
      display_name: [''],
      username: [''],
      dob:[''],
      password:[''],
      confirmpassword:['']
    });
  }
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  dates: any;
  years: any = [];
  ngOnInit(): void {
    this.getDate();
  }

  getDate() {
    this.dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    for (let year = 1964; year <= new Date().getFullYear(); year++) {
      this.years.push(year);
    }
  }
  onSignup() {
    if (this.signUpForm.valid) {
      this.loader = true;
      this.cdr.detectChanges(); // Force UI update

      const body = { ...this.signUpForm.value };
      this.authService.signup(body).subscribe({
        next: (res:any) => {
          console.log(res);
          this.loader = false; // Stop spinner
          this.cdr.detectChanges(); // Force UI update

          if (res.message === 'Please verify your email.') {
            this.toastr.success(res.message);
          } else if (res.message === 'User already exists') {
            this.toastr.warning(res.message);
          }
        },
        error:(err) => {
          this.loader = false; // Stop spinner
          this.cdr.detectChanges(); // Force UI update
          this.toastr.error(err.error.message);
        }
      });
    }
  }
}
