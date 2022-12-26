import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  constructor(
    private _authService: AuthService,
    private _router:Router
  ){
  }

  ngOnInit(): void {

    if(localStorage.getItem('token') != null){
      this._authService.verifyToken().subscribe(
        response=>{
        },
        error=>{
          localStorage.removeItem('token');
          localStorage.removeItem('_id');
          localStorage.removeItem('user');
          this._router.navigate(['/login']);
        }
      );
    }

    
    
  }

}
