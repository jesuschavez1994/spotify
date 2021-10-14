import { Component, OnInit } from '@angular/core';
import { Artist } from "../../models/spotify-track.model";
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id!: string;
  artist!: any;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private location: Location
  ) 
  {
    route.params.subscribe(
      param => {
        this.id = param['id'];
      }
    )
  }

  ngOnInit(): void {
    this.spotify.getArtist(this.id).subscribe( (resp: any) =>{
      this.renderArtist(resp);
    })
  }

  back(): void {
    this.location.back();
  }

  renderArtist(res: any): void {
    this.artist = res;
    console.log(this.artist);
  }

}
