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

  videostext: string = "";
  listTerms: Terms[] = [];

  channelsID: string[] = [];
  channelsIDNames: {[key:string]:string}[] = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }

  ngOnInit(): void {

    this.AppService.getPlaylist(this.nid).subscribe((playlist) => {
      this.playlist = playlist [0];
    });

    this.AppService.getPlaylistVideos(this.nid).subscribe((playlist_videos ) => {
      this.playlist_videos = playlist_videos;

      this.playlist_videos.forEach(x => {
        if(x.field_channel_1)
        {
          this.channelsID.push(x.field_channel_1)
        }
        return this.channelsID
      }) //fim do videosforeach

      this.AppService.getoneChannel(this.channelsID).subscribe((ch) => {

        ch.forEach(x => {
          this.channelsIDNames.push({[x.nid]: x.view_node})
        })
      })

    }); //fim getPlaylistVideos

    this.AppService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        if(Number(t.tid)===77)
        {
          this.videostext = t.name
        }
      })});

  } //fim do oninit

  returnNode(x:any) : string {
    let node

    node = this.channelsIDNames.find(obj => obj.hasOwnProperty(x))

    if (node) {return node[x]}
    return ""
  }

  }

