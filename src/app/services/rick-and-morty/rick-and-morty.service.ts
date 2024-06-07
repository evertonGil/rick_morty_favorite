import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RickAndMortySearchResultModel} from './rick-and-morty.model';

export interface SearchCharactersParams {
  searchText?: string;
  next?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseUri = 'https://rickandmortyapi.com/api';

  constructor(private httpClient: HttpClient) {}

  public searchCharacters({searchText, next}: SearchCharactersParams) {
    if (next) {
      return this.httpClient.get<RickAndMortySearchResultModel>(next);
    }

    return this.httpClient.get<RickAndMortySearchResultModel>(`${this.baseUri}/character`, {
      params: {
        name: searchText ?? '',
      },
    });
  }
}
