import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { AuthService } from '../../auth/auth.service';
import { forkJoin, from, of } from 'rxjs';
import { switchMap, mergeMap, map, toArray, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vibeshot',
  imports: [CommonModule,CommentModalComponent],
  templateUrl: './vibeshot.component.html',
  styleUrl: './vibeshot.component.scss',
})
export class VibeshotComponent {
  liked :boolean =false
  friendsList:any
  username = 'alex_23';
  profilePicture = '../../assets/VibeShot.png';  // Add your profile pic path
  postImage = '../../assets/VibeShot.png';  // Add the post image path
  likes = 142;
  caption = 'Working from home today! #remotework #productivity';
  commentsCount = 12;
  getUser = localStorage.getItem('userdetails');
  UserDetails = this.getUser?JSON.parse(this.getUser):''
profileImage= localStorage.getItem('userProfile')
  suggestions = [
    { id: 1, username: 'user_1' },
    { id: 2, username: 'user_2' },
    { id: 3, username: 'user_3' },
    { id: 4, username: 'user_4' },
    { id: 5, username: 'user_5' }
  ];
  openModal: boolean=false;
  ListOfPosts:any=[]
  usersWithImages: any;
  constructor(private authService:AuthService,private toastr:ToastrService){
    window.location.reload();
    this.getAllPosts();
    this.getundollowedUser();
    this.getFollowedUsersWithImages();
  }
  openCmntModal(){
    this.openModal = true
    document.body.classList.add('modal-open'); 
  }
  closeModal(){
    this.openModal =false
    document.body.classList.remove('modal-open'); 
  }
likePost(post: any): void {
  const data = {
    postId: post.id,
    userId: this.UserDetails.id
  };

  this.authService.likePost(data).subscribe({
    next: (res) => {
      console.log('Post liked:', res);
      this.liked = true;

      this.authService.getPostbyPostId(data).subscribe({
        next: (updatedPost:any) => {
          console.log('Updated post data:', updatedPost);
          post.likeCount = updatedPost.likeCount;
        },
        error: (err) => {
          console.error('Failed to fetch updated post data:', err);
        }
      });
    },
    error: (err) => {
      console.error('Failed to like post:', err);
    }
  });
}
getundollowedUser() {
  this.authService.getundollowedUser().pipe(
    switchMap((users: any) => {
      if (!users.length) return of([]); // If no users, return empty observable

      const requests = users.map((user:any) =>
        this.authService.getProfileImage(user.id).pipe(
          map(profileImage => ({
            ...user,
            profileImage
          })),
          catchError(() => of({ ...user, profileImage: null })) // handle individual errors gracefully
        )
      );

      return forkJoin(requests);
    })
  ).subscribe({
    next: (usersWithImages) => {
      console.log('Users with profile images:', usersWithImages);
      this.usersWithImages = usersWithImages
      // Use `usersWithImages` in your component as needed
    },
    error: (err) => {
      console.error('Failed to fetch users or images', err);
    }
  });
}

getFollowedUsersWithImages(): void {
  this.authService.getFollowedUsers().pipe(
    switchMap((res: any) => {
      const followedUsers = res.following || [];
      if (!followedUsers.length) return of([]);

      const requests = followedUsers.map((user: any) =>
        this.authService.getProfileImage(user.id).pipe(
          map(profileImage => ({
            ...user,
            profileImage
          })),
          catchError(() => {
            console.warn(`Failed to fetch profile image for user ID: ${user.id}`);
            return of({
              ...user,
              profileImage: null
            });
          })
        )
      );

      return forkJoin(requests);
    }),
    catchError(error => {
      console.error('Failed to fetch followed users', error);
      return of([]);
    })
  ).subscribe(usersWithImages => {
    this.friendsList = usersWithImages;
    console.log('Followed users with profile images:', usersWithImages);
  });
}


getAllPosts() {
  this.authService.getAllPost()             
    .pipe(
      switchMap((res: any) => {
        const posts = res as any[];
        return from(posts).pipe(   
          mergeMap(post =>
            forkJoin({
              downloadedImage: this.authService.downloadPostsImage({ fileUrl: post.mediaUrl }),
              profileImage:    this.authService.getProfileImage(post.userId)
            }).pipe(
              map(({ downloadedImage, profileImage }) => ({
                ...post,
                downloadedImage,
                profileImage
              }))
            )
          ),
          toArray()                
        );
      })
    )
    .subscribe({
      next: (postsWithAllImages) => {
        console.log('All posts enriched:', postsWithAllImages);
        // e.g. save locally, update your component state:
        this.ListOfPosts = postsWithAllImages;
      },
      error: err => {
        console.error('Error loading posts/images:', err);
        // this.toastr.error(err.message || 'Failed to load posts');
      }
    });
}
followUser(id:any){
this.authService.followUser(id).subscribe((res:any)=>{
  this.toastr.success(res.message);
  this.getundollowedUser()
})
}

}
