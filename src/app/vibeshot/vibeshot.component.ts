import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { CommentModalComponent } from './comment-modal/comment-modal.component';

@Component({
  selector: 'app-vibeshot',
  imports: [CommonModule,CommentModalComponent],
  templateUrl: './vibeshot.component.html',
  styleUrl: './vibeshot.component.scss',
})
export class VibeshotComponent {
  liked :boolean =false
  friendsList = [
    { id: 1, name: "Emma Thompson", image: "../../assets/VibeShot.png", status: "online", statusMessage: "Online" },
    { id: 2, name: "Michael Chen", image: "../../assets/VibeShot.png", status: "online", statusMessage: "Online" },
    { id: 3, name: "Sophia Rodriguez", image: "../../assets/VibeShot.png", status: "away", statusMessage: "Away · 5m" },
    { id: 4, name: "James Wilson", image: "../../assets/VibeShot.png", status: "offline", statusMessage: "Last seen 2h ago" },
    { id: 5, name: "Olivia Martinez", image: "../../assets/VibeShot.png", status: "online", statusMessage: "Online" },
    { id: 6, name: "Noah Johnson", image: "../../assets/VibeShot.png", status: "offline", statusMessage: "Last seen 1d ago" },
    { id: 7, name: "Ava Williams", image: "../../assets/VibeShot.png", status: "online", statusMessage: "Online" },
  ];
  username = 'alex_23';
  profilePicture = '../../assets/VibeShot.png';  // Add your profile pic path
  postImage = '../../assets/VibeShot.png';  // Add the post image path
  likes = 142;
  caption = 'Working from home today! #remotework #productivity';
  commentsCount = 12;
  user = {
    username: 'username',
    name: 'Your Name',
    profilePicture: 'assets/profile-pic.jpg' // Replace with actual image path
  };

  suggestions = [
    { id: 1, username: 'user_1' },
    { id: 2, username: 'user_2' },
    { id: 3, username: 'user_3' },
    { id: 4, username: 'user_4' },
    { id: 5, username: 'user_5' }
  ];
  openModal: boolean=false;
  openCmntModal(){
    this.openModal = true
    document.body.classList.add('modal-open'); 
  }
  closeModal(){
    this.openModal =false
    document.body.classList.remove('modal-open'); 
  }
  likePost(){
    this.liked =true
  }
}
