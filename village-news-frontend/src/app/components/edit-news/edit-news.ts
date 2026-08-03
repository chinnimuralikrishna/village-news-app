import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-news.html',
  styleUrl: './edit-news.css'
})
export class EditNews implements OnInit {

  id!: number;

  news = {
    title: '',
    description: '',
    category: '',
    location: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: Api
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getNews().subscribe((res: any) => {

      const list = Array.isArray(res) ? res : (res.data || []);

      const item = list.find((n: any) => n.id == this.id);

      if (item) {
        this.news = {
          title: item.title,
          description: item.description,
          category: item.category,
          location: item.location
        };
      }

    });

  }

  updateNews() {

    this.api.updateNews(this.id, this.news).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.router.navigate(['/my-news']);

      },

      error: (err: any) => {

        console.log(err);

        alert("Update Failed");

      }

    });

  }

}