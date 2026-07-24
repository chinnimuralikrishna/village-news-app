import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-news.html',
  styleUrl: './add-news.css'
})
export class AddNews {

  news = {
    title: '',
    description: '',
    category: '',
    location: ''
  };

  constructor(private api: Api) {}

  submitNews() {

    this.api.addNews(this.news).subscribe({

      next: (res: any) => {
        alert(res.message);
      },

      error: (err: any) => {
        console.log(err);
        alert(err.error.message);
      }

    });

  }

}