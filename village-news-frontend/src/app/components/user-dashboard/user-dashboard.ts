import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard {

  news: any[] = [];

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef // Added ChangeDetectorRef as a failsafe
  ) {}

 ngOnInit() {
  this.loadNews();
}

loadNews() {
  this.api.getNews().subscribe({
    next: (res: any) => {
      const data = Array.isArray(res) ? res : (res?.data || res?.news || []);
      this.news = data;
      this.cdr.detectChanges();
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}
likeNews(newsId: number) {

  const data = {
    news_id: newsId,
    user_id: 1
  };

  this.api.likeNews(data).subscribe({

    next: (res: any) => {

      alert(res.message);

      this.loadNews();

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}
}