import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../common/game";

@Injectable({
  providedIn: 'root'
})
export class GamesService {


  API_URI = 'http://localhost:3000/api/games';
  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(this.API_URI);
  }

  getOneGame(id: number): Observable<Game>{
    return this.http.get<Game>(this.API_URI+'/game/'+ id);
  }

  addGame(game: Game): Observable<any>{
    return this.http.post(this.API_URI,game);
  }

  updateGame(game: Game): Observable<any>{
    return this.http.put<any>(this.API_URI+'/'+game.id,game);
  }

  deleteGame(id: number): Observable<any>{
    //return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(this.API_URI+'/'+id);
  }
}
