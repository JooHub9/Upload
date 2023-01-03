import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "src/app/upload.service";
/*import {Playlist} from "src/app/interfaces"*/

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  nid: number;

  constructor(public route: ActivatedRoute, public UploadService: UploadService) {
    this.nid = route.snapshot.params["nid"];
  }

  playlist! : any;

  ngOnInit(): void {

    this.UploadService.getPlaylist(this.nid).subscribe((playlist : any) => {
      this.playlist = playlist;
    })
  }
  }

