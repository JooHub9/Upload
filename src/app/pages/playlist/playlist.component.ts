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
  /*playlist_video_string: string [] = [];
  currentIndex = 0;
  currentItem: Video = this.playlist_videos[ this.currentIndex ];
  video_playlist: string = "";*/

  videostext: string = "";
  listTerms: Terms[] = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }


  ngOnInit(): void {

    this.AppService.getPlaylist(this.nid).subscribe((playlist) => {
      this.playlist = playlist [0];
    });



    this.AppService.getPlaylistVideos(this.nid).subscribe((playlist_videos) => {
      this.playlist_videos = playlist_videos;

      /*this.playlist_video_string = this.currentItem.field_media_oembed_video
        .replace('/watch?v=', '/embed/')
        .split("&")

      this.video_playlist = this.playlist_video_string[0] + '?controls=2&cc_load_policy=1&cc_lang_pref=pt';

      onPlayerReady(this.currentItem) {
        /* isto não faz sentido, nada faz sentido */ /*this.currentItem = this.video_playlist;

        this.AppService.getPlaylistVideos(this.nid).subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
        this.AppService.getPlaylistVideos(this.nid).subscriptions.ended.subscribe(this.nextVideo.bind(this));
      }

        nextVideo(){
          this.currentIndex++;

          if (this.currentIndex === this.playlist_videos.length) {
            this.currentIndex = 0;
          }

          this.currentItem = this.playlist_videos[ this.currentIndex ];
        }

        playVideo() {
          this.currentItem.play();
        }

        onClickPlaylistItem(item: Video, index: number) {
          this.currentIndex = index;
          this.currentItem = item;
        }*/
      });




    this.AppService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        if(Number(t.tid)===77)
        {
          this.videostext = t.name
        }
      })});

  }
  }

