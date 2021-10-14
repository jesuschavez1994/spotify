import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { SpotifyApi, Item } from '../../models/spotify-track.model'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query!: string;
  results!: Item[];

  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.queryParams.subscribe(
      params => {
        this.query = params['query'] || ''
      }
    )
  }

  ngOnInit(): void {
    this.search();
  }

  search(){
    if(!this.query){
      return;
    }
    this.spotify.searchTrack(this.query).subscribe( (resp: SpotifyApi) =>{
      this.renderResults(resp.tracks.items)
    })
  }

  submit(query: string){
    this.router.navigate(['search'], {queryParams: {query: query} })
    .then(_ => this.search() );
  }

  renderResults( item: Item[]){
    if(item){
      this.results = item;
      console.log(this.results);
    }
  }

}
