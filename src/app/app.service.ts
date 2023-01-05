import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


const BASE_URL = "https://dev-project-upskill2-grupo3.pantheonsite.io/api/"


@Injectable({ providedIn: 'root' })

export class AppService {

  constructor(private http: HttpClient) { }


  /*_______ Comments _______*/

  /*------ GET ------*/

  getContentComments (id?:string)
  {
    return this.http.get<ContentComment[]>(BASE_URL + "contentcomments/"+ id);
  }

  getVideoComments ()
  {
    return this.http.get<VideoComment[]>(BASE_URL + "videocomments");
  }

  getOneVideoComments (id:string)
  {
    return this.http.get<VideoComment[]>(BASE_URL + "videocomments/"+ id);
  }

  /*------ POST ------*/

  postContentComments (id?:string, data?: ContentComment )
  {
    return this.http.post(BASE_URL + "contentcomments/:POST"+ id, data );
  }


  /*_______ Videos _______*/

  getVideos() {
    return this.http.get<Video[]>(BASE_URL + "videos");
  }

  getVideo(id:string) {
    return this.http.get<Video[]>(BASE_URL + "videos/"+id);
  }

  /*_______ Tags _______*/

  getTags() {
    return this.http.get<Tags[]>(BASE_URL + "tags");
  }

  /*_______ Likes _______*/


  postLike(id:string, like:string) {
    return this.http.post<Video[]>(BASE_URL + "videos/"+id,{field_dislike: like} );
  }

  postDislike(id:string, dislike:string, like:string) {
    return this.http.post<Video[]>(BASE_URL + "videos/"+id,{field_dislike: dislike} );
  }

  /*_______ Channels _______*/


  getChannels() {
    return this.http.get<Channel[]>(BASE_URL + "channels/");
  }

  getoneChannel(id:string) {
    return this.http.get<Channel[]>(BASE_URL + "channels/"+id);
  }

  getChannelsVideos(id:string) {
    return this.http.get<ChannelVideos[]>(BASE_URL + "channelvideos/"+id);
  }
}

