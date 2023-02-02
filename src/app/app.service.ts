import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class AppService {
  BASE_URL: string = "";
  getlanguage!: string[]
  userlanguage !: string

  constructor(private http: HttpClient) {
    this.language()
  }

  ngOnInit() {
    this.langUpdateObservable.subscribe(res => {
      if (res.langUpdate) {
        this.language();
      }
    });
  }


  public langUpdate = new BehaviorSubject<any>('');
  langUpdateObservable = this.langUpdate.asObservable();

  public notifylangUpdate(data: any) {
    if (data) {
      this.langUpdate.next(data);
    }
  }


  language() {
    this.getlanguage = JSON.parse(localStorage.getItem("userlanguage") || "[]");
    this.userlanguage = this.getlanguage.toString()

    if (this.userlanguage === 'pt') {
      this.BASE_URL = "https://dev-project-upskill2-grupo3-ii.pantheonsite.io/pt/";
    } else {
      this.userlanguage = "en"
      localStorage.setItem("userlanguage", JSON.stringify(this.userlanguage));
      this.BASE_URL = "https://dev-project-upskill2-grupo3-ii.pantheonsite.io/en/";
    }

  }

  getLanguage() {
    return this.userlanguage;
  }


  /*_______ Refresh Language _______*/


  modifyLanguage(lang: string) {
    this.userlanguage = lang;
    localStorage.setItem("userlanguage", JSON.stringify(this.userlanguage));
  }

  /*_______ Playlists _______*/


  getPlaylists() {
    return this.http.get<Playlist[]>(this.BASE_URL + "api/playlists");
  }

  getPlaylist(nid: string) {
    return this.http.get<Playlist[]>(this.BASE_URL + "api/playlists/" + nid);
  }


  getPlaylistVideos(nid: string) {
    return this.http.get<Video[]>(this.BASE_URL + "api/playlist/videos/" + nid);
  }


  /*_______ Thematics _______*/

  getThematics() {
    return this.http.get<Thematic[]>(this.BASE_URL + "api/thematics");
  }

  getSuggestedThematic() {
    return this.http.get<Thematics[]>(this.BASE_URL + "api/thematicsrandom?r=" + Date.now());
  }

  getThematic(nid: string) {
    return this.http.get<Thematic[]>(this.BASE_URL + "api/thematics/" + nid);
  }

  getThematicVideos(nid: string) {
    return this.http.get<Video[]>(this.BASE_URL + "api/thematic_article/videos/" + nid);
  }


  /*_______ Categories _______*/

  getCategories() {
    return this.http.get(this.BASE_URL + "api/categorias")
  }


  /*_______ Comments _______*/

  /*------ GET ------*/

  getContentComments(id?: string) {
    return this.http.get<ContentComment[]>(this.BASE_URL + "api/contentcomments/" + id);
  }

  getVideoComments() {
    return this.http.get<VideoComment[]>(this.BASE_URL + "api/videocomments");
  }

  getOneVideoComments(id: string) {
    return this.http.get<VideoComment[]>(this.BASE_URL + "api/videocomments/" + id);
  }

  /*------ POST ------*/

  getToken() {
    return this.http.get(this.BASE_URL + "session/token");
  }

  token = this.getToken();
  headers = {'Accept': 'application/vnd.api+json', 'X-CSRF-Token': String(this.token)};

  postComment(body: {}) {
    return this.http.post(this.BASE_URL + "comment/",
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
    return this.http.get<Reason[]>(this.BASE_URL + "api/reasonsreport");
  }

  Report(id: string, channel: boolean, reasons: {}[], count: number) {
    let body
    if (channel) {
      body = {
        "field_reported_cc": [{"value": 1}],
        "comment_type": [{"target_id": "comment"}],
        "field_report_reasons_cc": reasons,
        "field_count_reports_cc": [{"value": count}],
        "uid": [0]
      }
    } else {
      body = {
        "field_reported_vc": [{"value": 1}],
        "comment_type": [{"target_id": "video_comment"}],
        "field_report_reasons_vc": reasons,
        "field_count_reports_vc": [{"value": count}],
        "uid": [0]
      }
    }
    return this.http.patch("https://dev-project-upskill2-grupo3-ii.pantheonsite.io/comment/" + id, body,

      {'headers': this.headers}).subscribe(()=>{
      channel ? this.notifyChannels({refreshChannel: true}) : this.notifyVideos({refreshVideo: true});
      })
  }

  /*_______ Videos _______*/


  getVideos(page?: number, tag?: string, filter?: string) {
    let url = this.BASE_URL + "api/videos"
    if (filter) {
      url = url + "/search/?name=" + filter
    } else if (tag) {
      url = url + "/tag/" + tag
    } else if (page) {
      url = url + "/?page=" + page
    }
    return this.http.get<Video[]>(url);
  }

  getVideo(id: string) {
    return this.http.get<Video[]>(this.BASE_URL + "api/videos/" + id);
  }

  getIDByTitle(title:string){
    return this.http.get<any>(this.BASE_URL + "/video/" + title+"?_format=json");
  }


  getAllVideosChannel(id: string) {
    return this.http.get<Video[]>(this.BASE_URL + "api/allvideos/" + id+"?r=" + Date.now());
  }

  getAllVideosChannelTags(tags:string) {
    return this.http.get<Video[]>(this.BASE_URL + "api/allvideostags/?name="+tags);
  }

  /*_______ Search _______*/

  /*public notifySearch = new BehaviorSubject<any>('');
  notifySearchObservable = this.notifySearch.asObservable();

  getSearch(filter?: string) {
    return this.http.get<Video[]>(this.BASE_URL + "api/videos/search/?name=" + filter);
  }

  public noteSearch(data: any) {
    if (data) {
      this.notifySearch.next(data);
    }
  }*/


  /*_______ Tags _______*/

  getTags() {
    return this.http.get<Tags[]>(this.BASE_URL + "api/tags?r=" + Date.now());
  }

  /*_______ Likes _______*/

  /*------ GET ------*/

  getLikes(entity_id: string) {
    return this.http.get<Likes[]>(this.BASE_URL + "api/likesvideo/" + entity_id);
  }

  getDislikes(entity_id: string) {
    return this.http.get<Likes[]>(this.BASE_URL + "api/dislikesvideo/" + entity_id);
  }

  /*------ POST ------*/

  postLike(body: {}) {
    return this.http.post(this.BASE_URL + "entity/flagging",
      body, {'headers': this.headers});
  }

  postDislike(body: {}) {
    return this.http.post(this.BASE_URL + "entity/flagging",
      body, {'headers': this.headers});
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
    return this.http.get<Channel[]>(this.BASE_URL + "api/channels/");
  }

  getoneChannel(id: string) {
    return this.http.get<Channel[]>(this.BASE_URL + "api/channels/" + id);
  }

  getIDByTitleChannel(title:string){
    return this.http.get<any>(this.BASE_URL + title+"?_format=json");
  }

  getChannelsVideos(id: string,page?: number,) {
    let url = this.BASE_URL + "api/channelvideos/" + id;
    page? url+= "?page=" + page : url
    return this.http.get<ChannelVideos[]>(url);
  }

  getSuggestedChannels() {
    return this.http.get<Channel[]>(this.BASE_URL + "api/channelsrandom?r=" + Date.now());
  }

  /*------Favorites------*/

  favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");

  getFavorites() {
    return this.http.get<Video[]>(this.BASE_URL + "api/videos/favs/" + this.favorites.join(","));
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

  /*_______ Terms _______*/

  getTerms() {
    return this.http.get<Terms[]>(this.BASE_URL + "api/angularterms");
  }

  /*_______ Refresh ID videpage  _______*/

  public anotherID = new BehaviorSubject<any>('');
  notifyanotherID = this.anotherID.asObservable();

  public notifyAnotherID(data: any) {
    if (data) {
      this.anotherID.next(data);
    }
  }

}

