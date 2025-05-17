import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  imports: [CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  @ViewChild('otpInput') otpInput !: ElementRef;
formattedTime: string='00:60';
  otpInputs: any =[];
  mailid: any;
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.mailid = params['email'] || '';
  });
  this.startCountdown();
}

timeLeft: number = 60; 
interval: any;
isCounting: boolean = false;

startCountdown() {
  if (this.isCounting) return; 
  this.isCounting = true;
  
  this.interval = setInterval(() => {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      this.formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
      clearInterval(this.interval);
      this.isCounting = false;
    }
  }, 1000);
}
moveToNext(index: number,event:any) {
 console.log();
 if(event.inputType !=='deleteContentBackward'){
  this.otpInputs.push(this.otpInput.nativeElement.children[index].value)
  console.log(this.otpInputs);
  
  if(index <5){
    this.otpInput.nativeElement.children[index+1].focus();
  }
 }else if(event.inputType =='deleteContentBackward'){
  this.otpInputs.pop(this.otpInput.nativeElement.children[index].value)
  console.log(this.otpInputs);
  
  if(index>0){
    this.otpInput.nativeElement.children[index-1].focus();
  }
 }
 
 
}

verifyOTP() {
  const otp = this.otpInputs.join('')
  if (otp.length !== 6) {
    alert('Please enter a 6-digit OTP.');
    return;
  }
  

  this.authService.verifyOtp({ email: this.mailid, otp:otp }).subscribe({
    next:(res:any)=>{
      console.log(res);
      if(res['message']=='OTP verified successfully'){
        this.router.navigate(['home']);
        localStorage.setItem('authToken', res.token);
        localStorage.setItem("userdetails",JSON.stringify(res.user));
      }
    }
  });
}
}
