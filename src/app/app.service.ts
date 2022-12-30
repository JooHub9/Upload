import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


const BASE_URL = "https://dev-project-upskill2-grupo3.pantheonsite.io/api/"


@Injectable({ providedIn: 'root' })

export class AppService {

  constructor(private http: HttpClient) { }

  getContentComments ()
  {
    return this.http.get<ContentComment[]>(BASE_URL + "contentcomments");
  }

  getVideoComments ()
  {
    return this.http.get<VideoComment[]>(BASE_URL + "videocomments");
  }
  getVideos() {
    return this.http.get<Video[]>(BASE_URL + "videos");
  }
  getTags() {
    return this.http.get<Tags[]>(BASE_URL + "tags");
  }
}
