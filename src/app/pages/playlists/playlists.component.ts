import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "src/app/upload.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

/*import {Playlist} from "src/app/interfaces"*/

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  /*nid: number;*/

  constructor(public route: ActivatedRoute, public UploadService: UploadService) {
    /* this.nid = route.snapshot.params["nid"];*/
  }

  playlists! : any;
  faBookmark = faBookmark;
  faPlay = faPlay;

  ngOnInit(): void {

    this.UploadService.getPlaylists(/*this.nid*/).subscribe((playlists : any) => {
      this.playlists = playlists;
    })
  }

}
