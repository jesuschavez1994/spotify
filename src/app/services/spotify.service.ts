import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
//https://github.com/ngocsangyem/ng-book-8/blob/master/routes/music/src/app/spotify.service.ts
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  static BASE_URL = "https://api.spotify.com/v1";

  constructor(public http: HttpClient) { }

  query(URL: string, params?:Array<string>): Observable<any>{
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    console.log(params)
    console.log(queryURL);
    if(params){
      queryURL = `${queryURL}${params.join('&')}`;
      console.log(queryURL)
    }
    const apikey = environment.spotifyApiKey;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${apikey}`
    });
    const options = {
      headers: headers
    };
    return this.http.request('GET', queryURL, options);
  }

  search(query: string, type: string): Observable<any>{
    console.log("services", query, type)
    return this.query(`/search?`, [`q=${query}`, `type=${type}`]);
  }

  searchTrack(query: string): Observable<any>{
    return this.search(query, "track");
  }

  getArtist(id: string): Observable<any> {
    return this.query(`/artists/${id}`);
  }

  getTrack(id: string): Observable<any> {
    return this.query(`/tracks/${id}`);
  }

}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];
