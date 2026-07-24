import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  full_name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private api: Api) {}

  register() {

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      full_name: this.full_name,
      email: this.email,
      password: this.password
    };

   this.api.register(user).subscribe({
  next: (res: any) => {
    console.log(res);
  },
  error: (err: any) => {
    console.error(err);
  }
});

  }

}