import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  nid: string;
  playlist = {} as Playlist;
  playlist_videos: Video [] = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }

  ngOnInit(): void {

    this.AppService.getPlaylist(this.nid).subscribe((playlist) => {
      this.playlist = playlist [0];
    });

    this.AppService.getPlaylistVideos(this.nid).subscribe((playlist_videos ) => {
      this.playlist_videos = playlist_videos;
    });


  }
  }

