import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm: string;
  user: any;
  selectedType: string = 'artist';
  audio: HTMLAudioElement = new Audio();

  artists: Observable<any[]>;
  albums: Observable<any[]>;
  tracks: Observable<any>;
  playlists: Observable<any[]>;

  itemTypes = [
    { value: 'album', label: 'Album' },
    { value: 'artist', label: 'Artist' },
    { value: 'track', label: 'Track' },
    { value: 'playlist', label: 'Playlist' }
  ];

  constructor(
    private spotify: SpotifyService,
    private route: ActivatedRoute
  ) {
    console.log("route", route);
  }

  ngOnInit() {
  }

  login() {
    this.spotify.login().subscribe(
      token => {
        console.log(token);

        this.spotify.getCurrentUser()
          .subscribe(data => {
            console.log("getCurrentUser: ", data);
            this.user = data;
          },
          err => console.error(err));

      },
      err => console.error(err),
      () => { });
  }

  logout() {
    this.user = null;
    window.localStorage.removeItem('spotify-token');
  }

  async search() {
    let tracks = await this.spotify.search(this.searchTerm, 'track').toPromise();
    console.log("Tracks: ", tracks);
    this.tracks = tracks.tracks.items;
  }

  isPlaying(url: string): boolean{
    if(this.audio.paused) return false;
    if(this.audio.src == url) return true;
    return false; 
  }

  playToggle(url: string, obj: any) {
    if (url != this.audio.src) {
      this.playAudio(url);      
    } else {
      if (this.audio.paused) {
        this.playAudio(url);
      } else {
        this.pauseAudio();
      }
    }
  }

  playAudio(url: string) {
    if (!this.audio) this.audio = new Audio();
    if (this.audio.src != url) {
      this.audio.src = url;
      this.audio.load();
    }
    this.audio.play();
  }

  pauseAudio() {
    this.audio.pause();
  }

  getAlbum() {
    this.spotify.getAlbum('0sNOF9WDwhWunNAHPD3Baj').subscribe(data => {
      console.log(data);
    });
  }

}
