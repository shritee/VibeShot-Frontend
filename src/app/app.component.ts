import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TopBarComponent } from "../shared/top-bar/top-bar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
    title = 'Vibeshot';
  url = `${window.location}`
  private authService = inject(AuthService)
  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      const token = params['token'];
      if (token) {
        // Save the token securely
        localStorage.setItem('authToken', token);
        this.getUserDetails(params['id'])
        // Remove token from URL for security
        this.router.navigate([], {
          queryParams: { token: null },  // Clear token from URL
          queryParamsHandling: 'merge'   // Keep other query params
        });
      }
    });
  }
  getUserDetails(id:any){
    this.authService.getuserDeatils(id).subscribe((res:any)=>{
      console.log(res);
      if(res['data']){
      console.log(res);

        localStorage.setItem("userdetails",JSON.stringify(res.data))
      }
    })
  }

}
