import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [SharedModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
profilePic = "../../assets/more.png"
private authService = inject(AuthService)
private toastr = inject(ToastrService)
private router = inject(Router)
  loader: boolean = false;
onLogout(){
  this.loader = true
  this.authService.logout().subscribe((res:any)=>{
    console.log(res);
    if(res['message']=='Logged out successfully.'){
      this.toastr.success(res['message']);
      localStorage.clear();
      this.router.navigate(['/'])
      this.loader =false
    }
  },err=>{
    this.toastr.error(err.error.message);
    this.loader = false;
})
}
}
