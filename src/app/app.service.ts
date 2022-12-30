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



  getOneVideoComments (id:string)
  {
    return this.http.get<VideoComment[]>(BASE_URL + "videocomments/"+ id);
  }


  getVideos() {
    return this.http.get<Video[]>(BASE_URL + "videos");
  }

  getTags() {
    return this.http.get<Tags[]>(BASE_URL + "tags");
  }

  getVideo(id:string) {
    return this.http.get<Video[]>(BASE_URL + "videos/"+id);
  }

  postLikeDislike(id:string, dislike:string, like:string) {
    return this.http.post<Video[]>(BASE_URL + "videos/"+id,{field_dislike: dislike, field_like: like} );
  }
}

