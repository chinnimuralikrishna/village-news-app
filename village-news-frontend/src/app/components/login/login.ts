import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private api: Api,
    private router: Router
  ) {}

  login() {

    const user = {
      email: this.email,
      password: this.password
    };

    this.api.login(user).subscribe({

      next: (res: any) => {

        alert(res.message);

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }

      },

      error: (err: any) => {
        alert(err.error.message);
        console.log(err);
      }

    });

  }

}