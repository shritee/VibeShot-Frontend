import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(body: any) {
    return this.http.post(`${environment.baseURL}/signup`, body);
  }
  getuserDeatils(id: any) {
    return this.http.get(`${environment.baseURL}/user/${id}`);
  }
  login(body: any) {
    return this.http.post(`${environment.baseURL}/login`, body);
  }
  verifyOtp(body: any) {
    return this.http.post(`${environment.baseURL}/verify-otp`, body);
  }
  logout() {
    return this.http.post(`${environment.baseURL}/logout`, null, {
      // headers: { authorization: `${authToken}` }
    });
  }
  uploadProfile(form: any) {
    return this.http.post(`${environment.baseURL}/upload`, form);
  }
  getProfileImage(id: any) {
    return this.http
      .get(`${environment.baseURL}/user/${id}/getprofileimage`, {
        responseType: 'arraybuffer',
      })
      .pipe(
        map((arrayBuffer: ArrayBuffer) => {
          const base64String = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          return 'data:image/png;base64,' + base64String;
        })
      );
  }
  uploadPost(form: any) {
    return this.http.post(`${environment.baseURL}/uploadPost`, form);
  }
   getAllPost() {
    return this.http.get(`${environment.baseURL}/posts`);
  }
downloadPostsImage(fileUrl:any) {
  return this.http
    .post<ArrayBuffer>(`${environment.baseURL}/downloadPostsImage`, fileUrl, {
      responseType: 'arraybuffer' as 'json'
    })
    .pipe(
      map((arrayBuffer: ArrayBuffer) => {
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return 'data:image/png;base64,' + base64String;
      })
    );
}
getUserPosts(id:any){
  return this.http.get(`${environment.baseURL}/posts/${id}`);
}
likePost(form:any){
  return this.http.post(`${environment.baseURL}/like`, form);
}
getPostbyPostId(form:any){
    return this.http.post(`${environment.baseURL}/getPostbyPostId`, form);
}
getundollowedUser(){
   return this.http.get(`${environment.baseURL}/users/not-followed`);
}
getFollowedUsers(){
  return this.http.get(`${environment.baseURL}/followed-users`);
}
followUser(id:any){
   return this.http.post(`${environment.baseURL}/follow`,{
    'followingId':id
   });
}
}
