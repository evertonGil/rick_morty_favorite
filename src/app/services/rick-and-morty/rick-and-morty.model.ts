export interface RickAndMortySearchResultModel {
  info: RickAndMortySearchInfoModel;
  results: CharacterModel[];
}
export interface CharacterModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Origin {
  name: string;
  url: string;
}

export interface RickAndMortySearchInfoModel {
  count: number;
  pages: number;
  next: string;
  prev?: any;
}
