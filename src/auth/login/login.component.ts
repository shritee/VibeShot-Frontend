import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SignupComponent } from '../signup/signup.component';
import { slideInOutAnimation } from '../../shared/animation';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule,SignupComponent,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [slideInOutAnimation]
})
export class LoginComponent{
LoginForm:FormGroup

  private toastr = inject(ToastrService);
private authService = inject(AuthService);
private fb=inject(FormBuilder);
private router=inject(Router);
  loader: boolean=false;
constructor(){
  this.LoginForm = this.fb.group({
    email: [''],
    password:[''],
  });
}
  toggledValue: any = 'Login';
  handleToggle(value:any){
    this.toggledValue = value;
  }
  onLogin(){
    this.loader = true
    this.authService.login(this.LoginForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res['message']=='OTP has been sent via Email.'){
          this.loader = false;
          this.toastr.success(res['message']);
          this.router.navigate(['/otp'],{queryParams:{email:this.LoginForm.value.email}});
        }else{
          this.loader = false;
          this.toastr.error(res['message']);
        }
      },
      error:(err:any)=>{
        this.loader = false;
        this.toastr.error(err.error.message);
      }
    })
  }
}
