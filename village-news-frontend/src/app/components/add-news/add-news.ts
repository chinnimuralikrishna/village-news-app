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
    location: '',
    author_id: 1,
    image: ''
  };

  selectedFile!: File;

  constructor(private api: Api) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitNews() {

    console.log("Submit button clicked");

    if (!this.selectedFile) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", this.selectedFile);

    this.api.uploadImage(formData).subscribe({

      next: (res: any) => {

        this.news.image = res.filename;

        this.api.addNews(this.news).subscribe({

          next: (response: any) => {
            alert(response.message);
          },

          error: (err: any) => {
            console.log(err);
            alert("Failed to save news.");
          }

        });

      },

      error: (err: any) => {
        console.log(err);
        alert("Image upload failed.");
      }

    });

  }

}