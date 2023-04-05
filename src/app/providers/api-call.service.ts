import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface Root {
  status: string
  totalResults: number
  articles: Article[]
}

export interface Article {
  source: Source
  author?: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content?: string
}

export interface Source {
  id?: string
  name: string
}


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private _http:HttpClient) { }
  url = 'https://newsapi.org/v2/top-headlines?';
  // 'q=Apple&' +
  // 'from=2023-04-04&' +
  // 'sortBy=popularity&' +
  // 'apiKey=f8c7a8a4e287411bb08247db4158ea52';
  getdata(size:number,page:number){
    return this._http.get<Root>(this.url + 'country=in&' + '&pageSize=' + size + '&page=' + page + '&apiKey=f8c7a8a4e287411bb08247db4158ea52').pipe(map((Resp:Root) => Resp.articles))
  }
}
