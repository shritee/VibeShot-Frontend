import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  profileForm: FormGroup;
  profileImage = '../../assets/VibeShot.png'; // Default profile image@
  @ViewChild('uploadprofilePic')uploadprofilePic !: ElementRef
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: ['johndoe'],
      fullName: ['John Doe'],
      bio: ['Digital creator | Photographer | Travel enthusiast'],
      website: ['johndoe.com']
    });
  }

  changeProfilePicture() {
    this.uploadprofilePic.nativeElement?.click();
  }

  closeModal() {
    alert('Modal closed');
  }

  saveChanges() {
    console.log('Profile updated:', this.profileForm.value);
    alert('Changes saved!');
  }
}
