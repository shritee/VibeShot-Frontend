import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-modal',
  imports: [FormsModule,CommonModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.scss'
})
export class CommentModalComponent {
  @Output() closeModal= new EventEmitter()
  comments: any[] = [
    {
      username: 'alex_design',
      profilePic: 'assets/user1.jpg', // Replace with actual profile image
      text: 'This looks amazing! Where was this taken?',
      time: '2h',
      likes: 24,
      replies: 3
    },
    {
      username: 'sarah.j',
      profilePic: 'assets/user2.jpg',
      text: 'The colors in this photo are incredible! What camera did you use?',
      time: '3h',
      likes: 17
    },
    {
      username: 'michael_p',
      profilePic: 'assets/user3.jpg',
      text: 'This is exactly the inspiration I needed today!',
      time: '5h',
      likes: 9
    }
  ];

  userProfile = {
    profilePic: 'assets/my-profile.jpg' // Replace with the actual logged-in user profile pic
  };

  newComment = '';

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        username: 'You',
        profilePic: this.userProfile.profilePic,
        text: this.newComment,
        time: 'Just now',
        likes: 0
      });
      this.newComment = '';
    }
  }
  closeCMTModal(){
    this.closeModal.emit('')
  }
}
