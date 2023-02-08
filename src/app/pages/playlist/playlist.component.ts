import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {end} from "@popperjs/core";


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, NgxYoutubePlayerModule {

  //player!: YT.Player;
  player: any;
  currentVideoIndex = 0;

  nid: string;
  playlist = {} as Playlist;
  playlist_videos: Video [] = [];
  playlist_video = {} as Video;
  playlist_video_string: string [] = [];
  video_playlist: string = "";
  videos_playlist: string [] = [];

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
      for (let currentIndex = 0; currentIndex < this.playlist_videos.length; currentIndex++) {
        this.playlist_video_string = this.playlist_videos[currentIndex].field_media_oembed_video
          .split("v=")
        this.videos_playlist.push(this.playlist_video_string[1])
      }
      this.video_playlist = this.videos_playlist[0];
    });


    this.AppService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        if (Number(t.tid) === 77) {
          this.videostext = t.name
        }
      })
    });

  }


  savePlayer(player: YT.Player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event: YT.PlayerEvent) {
    console.log('player state', event.target.getPlayerState());
    if(event.target.getPlayerState()===0)
    {
      this.video_playlist=== this.videos_playlist[this.videos_playlist.length-1]?
        this.video_playlist= this.videos_playlist[0]:
      this.video_playlist= this.videos_playlist[this.videos_playlist.indexOf(this.video_playlist)+1]
      this.player.loadVideoById(this.video_playlist)
    }

  }

  getvideoId(id: string) {

    this.video_playlist = id.split("v=")[1];
    this.player.loadVideoById(this.video_playlist);

  }//fim do getvideoid


}//fim da class

