import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

const BASE_URL = "https://dev-project-upskill2-grupo3-ii.pantheonsite.io/api/"


@Injectable({providedIn: 'root'})

export class AppService {



  constructor(private http: HttpClient) {
  }


  /*_______ Playlists _______*/


  getPlaylists() {
    return this.http.get<Playlist[]>(BASE_URL + "playlists");
  }

  getPlaylist(nid: string) {
    return this.http.get<Playlist[]>(BASE_URL + "playlists/" + nid);
  }


  getPlaylistVideos(nid : string) {
    return this.http.get<Video[]>(BASE_URL + "playlist/videos/" + nid);
  }



  /*_______ Thematics _______*/

  getThematics() {
    return this.http.get<Thematic[]>(BASE_URL + "thematics");
  }

  getSuggestedThematic() {
    return this.http.get<Thematics[]>(BASE_URL + "thematicsrandom?r=" + Date.now());
  }

  getThematic(nid : string) {
    return this.http.get<Thematic[]>(BASE_URL + "thematics/" + nid);
  }

  getThematicVideos(nid : string) {
    return this.http.get<Video[]>(BASE_URL + "thematic_article/videos/" + nid);
  }


  /*_______ Categories _______*/

  getCategories() {
    return this.http.get(BASE_URL + "categorias")
  }



  /*_______ Comments _______*/

  /*------ GET ------*/

  getContentComments(id?: string) {
    return this.http.get<ContentComment[]>(BASE_URL + "contentcomments/" + id);
  }

  getVideoComments() {
    return this.http.get<VideoComment[]>(BASE_URL + "videocomments");
  }

  getOneVideoComments(id: string) {
    return this.http.get<VideoComment[]>(BASE_URL + "videocomments/" + id);
  }

  /*------ POST ------*/

  getToken() {
    return this.http.get("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/session/token");
  }

  token = this.getToken();


  headers = {'Accept': 'application/vnd.api+json', 'X-CSRF-Token': String(this.token)};


  postComment(body: {}) {
    return this.http.post("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/comment/",
      body,
      {'headers': this.headers});
  }

  /*------- Refresh Comments ------*/


  public notifyVideo = new BehaviorSubject<any>('');
  public notifyChannel = new BehaviorSubject<any>('');

  notifyVideoObservable = this.notifyVideo.asObservable();

  public notifyVideos(data: any) {
    if (data) {
      this.notifyVideo.next(data);
    }
  }

  notifyChannelObservable = this.notifyChannel.asObservable();

  public notifyChannels(data: any) {
    if (data) {
      this.notifyChannel.next(data);
    }
  }

  /*------- Report Comment ------*/

  getReasons() {
    return this.http.get<Reason[]>(BASE_URL + "reasonsreport");
  }


  Report (id:string,channel:boolean,reasons:{}[],count:number) {
    let body
    if(channel)
    {
      body ={
        "field_reported_cc": [{"value": 1}],
        "comment_type": [{"target_id": "comment"}],
        "field_report_reasons_cc":reasons,
        "field_count_reports_cc": [{"value": count}],
        "uid": [0]
      }}
    else {
      body = {
        "field_reported_vc": [{"value": 1}],
        "comment_type": [{"target_id": "video_comment"}],
        "field_report_reasons_vc":reasons,
        "field_count_reports_vc": [{"value": count}],
        "uid": [0]
      }
    }
    return this.http.patch("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/comment/" + id, body,

      {'headers': this.headers}).subscribe()

  }


  /*_______ Videos _______*/

  getVideos(page?: number, tag?: number) {
    let url = BASE_URL + "videos"
    if (page) {
      url = url + "?page=" + page
    }
    if (tag) {
      url = url + "/tag/" + tag
    }
    return this.http.get<Video[]>(url);
  }

  getVideo(id: string) {
    return this.http.get<Video[]>(BASE_URL + "videos/" + id);
  }

  getAllVideosChannel(id: string) {
    return this.http.get<Video[]>(BASE_URL + "allvideos/" + id);
  }


  /*_______ Tags _______*/

  getTags() {
    return this.http.get<Tags[]>(BASE_URL + "tags?r=" + Date.now());
  }


  /*_______ Likes _______*/

  /*------ GET ------*/

  getLikes(entity_id: string) {
    return this.http.get<Likes[]>(BASE_URL + "likesvideo/" + entity_id);
  }

  getDislikes(entity_id: string) {
    return this.http.get<Likes[]>(BASE_URL + "dislikesvideo/" + entity_id);
  }


  /*------ POST ------*/

  postLike (body:{} )
  {
    return this.http.post("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/entity/flagging",
      body,{'headers': this.headers});
  }

  postDislike (body:{} )
  {
    return this.http.post("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/entity/flagging",
      body,{'headers': this.headers});

  }

      /*------ Refresh Likes / Dislikes ------*/

  public notifyLike = new BehaviorSubject<any>('');
  notifyLikesObservable = this.notifyLike.asObservable();

  public notifyLikes(data: any) {
    if (data) {
      this.notifyLike.next(data);
    }
  }

  public notifyDislike = new BehaviorSubject<any>('');
  notifyDislikesObservable = this.notifyDislike.asObservable();

  public notifyDislikes(data: any) {
    if (data) {
      this.notifyDislike.next(data);
    }
  }

  /*_______ Channels _______*/


  getChannels() {
    return this.http.get<Channel[]>(BASE_URL + "channels/");
  }

  getoneChannel(id: string) {
    return this.http.get<Channel[]>(BASE_URL + "channels/" + id);
  }

  getChannelsVideos(id: string) {
    return this.http.get<ChannelVideos[]>(BASE_URL + "channelvideos/" + id);
  }

  getSuggestedChannels() {
    return this.http.get<Channel[]>(BASE_URL + "channelsrandom?r=" + Date.now());
  }


  /*------Favorites------*/

  favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");


  getFavorites() {
      return this.http.get<Video[]>(BASE_URL + "videos/favs/" + this.favorites.join(","));
  }

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


 /* /!*------- Refresh VideoPage ------*!/

/*
  public changePage = new BehaviorSubject<any>('');

  notifyVideoPage = this.changePage.asObservable();

  public notifyPage(data: any) {
    if (data) {
      this.changePage.next(data);
    }

  }*/
}

