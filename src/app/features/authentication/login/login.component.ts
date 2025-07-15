import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LogIn } from '../../../core/models/login.model';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  model : LogIn = new LogIn() ;
  router = inject(Router);
  loginService = inject(LoginService);
  
  onSubmit(userForm: NgForm) {

    this.loginService.login(this.model).subscribe({
      next: (res) => {
        if (res.token) {
          this.loginService.setUser(res.token);
          this.router.navigate(['/layout/connections']);
        }
      },
      error: (err) => {
      },
    });
  }
}