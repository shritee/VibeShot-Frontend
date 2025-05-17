import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, EditProfileComponent],
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
    profileImage: '../../assets/VibeShot.png', // Change this to a valid image path
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

  setActiveTab(tab: string) {
    this.user.activeTab = tab;
  }
  openEditModal(){
    this.openModal = true
    document.body.classList.add('modal-open'); 
  }
  closeModal(){
    this.openModal =false
    document.body.classList.remove('modal-open'); 
  }
}
