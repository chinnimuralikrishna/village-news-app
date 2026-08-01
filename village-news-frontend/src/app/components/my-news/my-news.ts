import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-my-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-news.html',
  styleUrl: './my-news.css'
})
export class MyNews implements OnInit {

  news: any[] = [];
  userId: number = 1; // Temporary ID for testing

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMyNews();
  }

  loadMyNews() {
    console.log("Fetching news for userId:", this.userId);

    this.api.getMyNews(this.userId).subscribe({
      next: (res: any) => {
        console.log("My News Response:", res);
        
        // Handle direct array or wrapped payload safely
        this.news = Array.isArray(res) ? res : (res?.data || []);
        
        console.log("Assigned news count:", this.news.length);

        // Force Angular view update
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error("Error fetching my news:", err);
      }
    });
  }
  editNews(item: any) {
  this.router.navigate(['/edit-news', item.id]);
}

deleteNews(id: number) {

  if (!confirm("Are you sure you want to delete this news?")) {
    return;
  }

  this.api.deleteNews(id).subscribe({
    next: (res: any) => {
      alert(res.message);
      this.loadMyNews(); // Refresh the list
    },
    error: (err: any) => {
      console.log(err);
      alert("Unable to delete news.");
    }
  });

}
}