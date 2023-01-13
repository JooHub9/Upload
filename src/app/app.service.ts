import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

const BASE_URL = "https://dev-project-upskill2-grupo3-ii.pantheonsite.io/api/"



@Injectable({ providedIn: 'root' })

export class AppService {





  constructor(private http: HttpClient) { }




  /*_______ Playlists _______*/


  getPlaylists() {
    return this.http.get<Playlists[]>(BASE_URL + "playlists");
  }

  getPlaylist(nid : string) {
    return this.http.get<Playlist[]>(BASE_URL + "playlists/" + nid);
  }

  getPlaylistVideos(nid : string) {
    return this.http.get<Playlist_Video[]>(BASE_URL + "playlist/videos/" + nid);
  }

  /*_______ Thematics _______*/

  getThematics() {
    return this.http.get<Thematics[]>(BASE_URL + "thematics/");
  }

  getThematicsNid(nid:string){
    return this.http.get<Thematics[]>(BASE_URL + "thematics/" + nid);
  }

  getCategories() {
    return this.http.get(BASE_URL + "categorias")
  }


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

  getToken()
  {
    return this.http.get("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/session/token");
  }

  token = this.getToken();

  headers = { 'Accept': 'application/vnd.api+json', 'X-CSRF-Token': String(this.token)};


  postComment (body:{} )
  {
    return this.http.post("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/comment/",
                               body,
                        {'headers': this.headers});
  }

            /*------- Refresh Comments ------*/


  public notifyVideo = new BehaviorSubject<any>('');

  public notifyChannel = new BehaviorSubject<any>('');

  notifyVideoObservable$ = this.notifyVideo.asObservable();

  public notifyVideos(data: any) {
    if (data) {
      this.notifyVideo.next(data);
    }
  }


  notifyChannelObservable$ = this.notifyChannel.asObservable();

  public notifyChannels(data: any) {
    if (data) {
      this.notifyChannel.next(data);
    }
  }
            /*------- Report Comment ------*/

  postCommentReport (body:{} )
  {
    return this.http.post("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/comment/",
      body,
      {'headers': this.headers});
  }





  /*_______ Videos _______*/

  getVideos(page?:number) {
    let url = BASE_URL + "videos"
    if(page){
    url = url + "?page=" + page
    }
    return this.http.get<Video[]>(url);
  }

  getVideo(id:string) {
    return this.http.get<Video[]>(BASE_URL + "videos/"+id);
  }

  getAllVideosChannel(id:string)
  {
    return this.http.get<Video[]>(BASE_URL + "allvideos/"+id);
  }

  /*_______ Tags _______*/

  getTags() {
    return this.http.get<Tags[]>(BASE_URL + "tags");
  }



  /*_______ Likes _______*/

      /*------ GET ------*/

  getLikes(entity_id:string) {
    return this.http.get<Likes[]>(BASE_URL + "likesvideo/"+ entity_id);
  }

  getDislikes(entity_id:string) {
    return this.http.get<Likes[]>(BASE_URL + "dislikesvideo/"+ entity_id);
  }
      /*------ POST ------*/

  postlike(entity_id:string, likecount:string, like:string) {
    return this.http.post<Likes[]>(BASE_URL + "likesvideo/"+entity_id,
      [{count: likecount,
              entity_id: entity_id}],
      {}


    );
  }

  postDislike(entity_id:string, dislike:string, like:string) {
    return this.http.post<Likes[]>(BASE_URL + "dislikesvideo/"+entity_id,{field_dislike: dislike} );
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


  /*------Favorites------*/

  getFavorites() {
    return this.http.get<Video[]>(BASE_URL + "videos/" + this.favorites.join(","));
  }


  favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");


  isFavorite(mid: string) {
    let id = parseInt(mid)
    return this.favorites.includes(id);
  }

  toggleFavorite(mid: string) {
    let id = parseInt(mid)
    if (this.isFavorite(mid)) {
      this.favorites.splice(this.favorites.indexOf(id), 1)
    } else {
      this.favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(this.favorites))
  }


}

