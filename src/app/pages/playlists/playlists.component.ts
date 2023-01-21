import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "src/app/app.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public AppService: AppService) {
  }

  playlists : Playlist[] = [];
  faBookmark = faBookmark;
  faPlay = faPlay;

  ngOnInit(): void {

    this.AppService.getPlaylists().subscribe((playlists  ) => {
      this.playlists = playlists;
    })
  }
}
