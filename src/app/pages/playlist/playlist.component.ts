import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";
// @ts-ignore
import {Playlist, Video} from "src/app/interfaces";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  nid: number;
  playlist? : any;
  playlist_videos? : any = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }

  ngOnInit(): void {

    this.AppService.getPlaylist(this.nid).subscribe((playlist : any) => {
      this.playlist = playlist;
    });

    this.AppService.getPlaylistVideos(this.nid).subscribe((playlist_videos : any ) => {
      this.playlist_videos = playlist_videos;
    });
  }
  }

