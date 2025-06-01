import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  profileForm: FormGroup;
  profileImage = localStorage.getItem('userProfile'); // Default profile image@
  @ViewChild('uploadprofilePic')uploadprofilePic !: ElementRef
  getUser = localStorage.getItem('userdetails');
  UserDetails = this.getUser?JSON.parse(this.getUser):''
  constructor(private fb: FormBuilder,private authservice:AuthService) {
    this.profileForm = this.fb.group({
      username: [this.UserDetails.username],
      fullName: [this.UserDetails.display_name],
      bio: [],
      website: []
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
onFileUpload(fileInput: HTMLInputElement) {
  const file = fileInput.files?.[0];  // Get the first selected file

  if (file) {
    let UserDetails = localStorage.getItem('userdetails');

if (UserDetails !== null) {
  let UserID = JSON.parse(UserDetails);
  console.log(UserID);
   let form = new FormData();
     form.append('file', file); 
     form.append('description', 'profile'); 
     form.append('userId', UserID.id); 
    this.authservice.uploadProfile(form).subscribe(res=>{
      console.log(res);
      
      setTimeout(() => {
      this.authservice.getProfileImage(UserID.id).subscribe(dataUrl => {
    this.profileImage = dataUrl;
    localStorage.setItem('userProfile',this.profileImage)
  });
      }, 100);
    })
} else {
  console.warn('userdetails not found in localStorage');
}

   
    // You can now use this file, e.g., send it to a backend or preview it
  } else {
    console.log('No file selected');
  }
}

}
