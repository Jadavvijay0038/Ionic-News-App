import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Root {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  id: any;
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  private apiKey = 'f8c7a8a4e287411bb08247db4158ea52';

  private url = 'https://newsapi.org/v2/';

  constructor(private http: HttpClient) { }

  getData(pageSize: number, page: number): Observable<Article[]> {
    const apiUrl = `${this.url}top-headlines?pageSize=${pageSize}&page=${page}&apiKey=${this.apiKey}`;
    return this.http.get<Root>(apiUrl).pipe(
      map((response: Root) => response.articles)
    );
  }

  searchNews(Searchkey: any) {
    const apiUrl = `${this.url}everything?q=${Searchkey}&apiKey=${this.apiKey}`;
    return this.http.get<Root>(apiUrl).pipe(
      map((response: Root) => response.articles)
    );
  }
}
