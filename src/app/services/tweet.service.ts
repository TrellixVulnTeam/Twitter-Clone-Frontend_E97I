import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tweet} from "../models/tweet";
import {Observable, of} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  newTweets: Tweet[];

  constructor(private http: HttpClient) { }

  getNewTweets(): Observable<Tweet[]> {
    return of(this.newTweets);
  }

  getTweet(id: number): Observable<Tweet> {
    return this.http.get<Tweet>(`https://twitter.ahmednur.me/api/tweet/${id}`, {responseType: "json"});
  }

  getReplies(id: number): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`https://twitter.ahmednur.me/api/tweet/${id}/replies/0`);
  }

  getHome(page: number) {
    return this.http.get<Tweet[]>(`https://twitter.ahmednur.me/api/${page}`, {responseType: "json"});
  }

  getTweetsByAuthor(tag: string, page: number) {
    return this.http.get<Tweet[]>(`https://twitter.ahmednur.me/api/profile/${tag}/${page}`, {responseType: "json"});
  }

  likeTweet(id: number) {
    return this.http.post(`https://twitter.ahmednur.me/api/tweet/${id}/like`, {});
  }

  retweet(id: number) {
    return this.http.post(`https://twitter.ahmednur.me/api/tweet/${id}/retweet`, {});
  }

  removeLikedTweet(id: number) {
    return this.http.post(`https://twitter.ahmednur.me/api/tweet/${id}/unlike`, {});
  }

  removeRetweet(id: number) {
    return this.http.post(`https://twitter.ahmednur.me/api/tweet/${id}/removeRetweet`, {});
  }

  createTweet(content: string) {
    let formData = new FormData();
    formData.append('content', content);
    return this.http.post<number>(`https://twitter.ahmednur.me/api/compose`, formData);
  }

  deleteTweet(id: number) {
    return this.http.delete(`https://twitter.ahmednur.me/api/tweet/${id}`);
  }

  replyToTweet(parentId: number, content: string) {
    let formData = new FormData();
    formData.append('content', content);
    return this.http.post<number>(`https://twitter.ahmednur.me/api/tweet/${parentId}/reply`, formData);
  }

  getProfile(tag: string) {
    return this.http.get<User>(`https://twitter.ahmednur.me/api/profile/${tag}`);
  }

  follow(tag: string) {
    return this.http.post(`https://twitter.ahmednur.me/api/profile/${tag}/follow`, {});
  }

  unfollow(tag: string) {
    return this.http.post(`https://twitter.ahmednur.me/api/profile/${tag}/unfollow`, {});
  }

  changeDisplayName(displayName: string) {
    let formData = new FormData();
    formData.append('displayName', displayName);
    return this.http.post(`https://twitter.ahmednur.me/api/settings/displayname`, formData);
  }

  changeTag(tag: string) {
    let formData = new FormData();
    formData.append('tag', tag);
    return this.http.post(`https://twitter.ahmednur.me/api/settings/tag`, formData);
  }

  changeBio(bio: string) {
    let formData = new FormData();
    formData.append('bio', bio);
    return this.http.post(`https://twitter.ahmednur.me/api/settings/bio`, formData);
  }
}
