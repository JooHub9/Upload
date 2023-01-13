import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


const BASE_URL = "https://dev-project-upskill2-grupo3-ii.pantheonsite.io/api/"


@Injectable({ providedIn: 'root' })

export class AppService {

  constructor(private http: HttpClient) { }

  getPlaylists() {
    return this.http.get<Playlists[]>(BASE_URL + "playlists");
  }

  getPlaylist(nid : string) {
    return this.http.get<Playlist[]>(BASE_URL + "playlists/" + nid);
  }

  getPlaylistVideos(nid : string) {
    return this.http.get<Playlist_Video[]>(BASE_URL + "playlist/videos/" + nid);
  }

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

  postContentComments (id?:string, data?: ContentComment )
  {
    return this.http.post(BASE_URL + "contentcomments/:POST"+ id, data );
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

