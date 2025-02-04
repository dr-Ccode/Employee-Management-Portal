import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  private professionApiUrl = 'https://my.api.mockaroo.com/professions.json?key=40fc2800';
  constructor(private http: HttpClient) { }

  getProfessions() {
    return this.http.get<any[]>(this.professionApiUrl);
  }
}
