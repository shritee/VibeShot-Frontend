import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { from, of } from 'rxjs';
import { switchMap, mergeMap, map, toArray, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, EditProfileComponent,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    username: 'johndoe',
    fullName: 'John Doe',
    posts: 42,
    followers: 1250,
    following: 587,
    bio: 'Digital creator | Photographer | Travel enthusiast',
    website: 'johndoe.com',
    profileImage: localStorage.getItem('userProfile'), // Change this to a valid image path
    postsList: [
      { image: '../../assets/VibeShot.png' },
      { image: '../../assets/VibeShot.png' },
      { image: '../../assets/VibeShot.png' },
      { image: '../../assets/VibeShot.png' },
      { image: '../../assets/VibeShot.png' }
    ],
    activeTab: 'posts'
  };
  openModal: boolean = false;
  profileImage: string | undefined;
  getUser = localStorage.getItem('userdetails');
  UserDetails = this.getUser?JSON.parse(this.getUser):''
  opneUploadModal = false;
  uploadPostForm:FormGroup;
  selectedPosts:any
  file!: File;
  postsList: any;
constructor(private AuthService:AuthService,private toastr:ToastrService,private fb:FormBuilder){
  this.uploadPostForm = this.fb.group({
    file:['',Validators.required],
    caption:['']
  })
  this.getProfileData();
  this.getUserPosts();
}
  setActiveTab(tab: string) {
    this.user.activeTab = tab;
  }
  openEditModal(){
    this.openModal = true
    document.body.classList.add('modal-open'); 
  }
  closeModal(){
    this.openModal =false
    this.opneUploadModal =false
    document.body.classList.remove('modal-open'); 
    this.uploadPostForm.reset();
    this.selectedPosts=null
  }
  getProfileData(){
    this.AuthService.getProfileImage(this.UserDetails.id).subscribe({
      next:dataUrl => {
    this.profileImage = dataUrl;
    localStorage.setItem('userProfile',this.profileImage)
  },error: (err) => {
    this.toastr.error(err.message)
  }
    });
  }
getUserPosts(): void {
  this.AuthService.getUserPosts(this.UserDetails.id).pipe(
    switchMap((posts: any) => 
      from(posts).pipe(
        mergeMap((post:any) =>
          this.AuthService.downloadPostsImage({ fileUrl: post.mediaUrl }).pipe(
            map(imageData => ({
              ...post,
              imageData
            })),
            catchError(err => {
              this.toastr.error('Failed to download an image.');
              console.error('Image download error:', err);
              return of(null); // emit null for failed images
            })
          )
        ),
        toArray() // collect all successful/failed items into an array
      )
    ),
    catchError(err => {
      this.toastr.error(err.message || 'Failed to fetch user posts.');
      console.error('Post fetch error:', err);
      return of([]); // fallback to empty array
    })
  ).subscribe({
    next: (postsWithImages: any[]) => {
      // Filter out any nulls due to failed downloads
      this.postsList = postsWithImages.filter(post => post !== null);
      console.log('Posts with images:', this.postsList);
    }
  });
}

  handlePostsToUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

     this.file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedPosts = reader.result;
    };

    reader.readAsDataURL(this.file);
  }
  uploadPost(){
  const currentDate = moment(new Date()).format('DD-MM-YYYY hh:mm');  // formatted string
const parsedDate = moment(currentDate, 'DD-MM-YYYY hh:mm').toDate();
const isoDateString = parsedDate.toISOString();
       let form = new FormData();
     form.append('file', this.file); 
     form.append('caption', this.uploadPostForm.value.caption); 
     form.append('userId', this.UserDetails.id); 
     form.append('createdAt', isoDateString); 
    this.AuthService.uploadPost(form).subscribe({
      next:res=>{
        this.toastr.success("Post uploaded successfully.");
        this.uploadPostForm.reset();
    this.selectedPosts=null;
    this.opneUploadModal =false
    },error:err=>{
      this.toastr.error(err.error.message)
    }
    })
  }
}
