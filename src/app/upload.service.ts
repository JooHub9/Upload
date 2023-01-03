import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  API_URL = environment.API_URL;

  getPlaylists(/*nid : number*/) {
    return this.http.get(this.API_URL + "/api/playlists" /*+ nid*/);
  }

  getPlaylist(nid : number) {
    return this.http.get(this.API_URL + "/api/playlist/videos/" + nid);
  }

  getCategories() {
    return this.http.get(this.API_URL + "/api/categorias")
  }

  constructor(public http: HttpClient) { }
}
