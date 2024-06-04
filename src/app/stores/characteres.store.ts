import {inject} from '@angular/core';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {tapResponse} from '@ngrx/operators';
import {debounceTime, distinctUntilChanged, pipe, switchMap, tap} from 'rxjs';
import {RickAndMortyService, SearchCharactersParams} from '../services/rick-and-morty.service';
import {CharacterModel, RickAndMortySearchInfoModel} from '../services/rick-and-morty.model';

interface CharacteresState {
  characters: CharacterModel[];
  infoResponse: Partial<RickAndMortySearchInfoModel>;
  query: SearchCharactersParams;
  isLoading: boolean;
  favorite?: CharacterModel[];
}

const initialState: CharacteresState = {
  characters: [],
  query: {searchText: ''},
  infoResponse: {},
  isLoading: false,
};

export const CharacteresStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(RickAndMortyService)) => ({
    addFavorite(character: CharacterModel): void {
      patchState(store, (state) => ({
        characters: [...state.characters, character],
      }));
    },
    updateSearchText(searchText: string): void {
      patchState(store, () => ({query: {searchText}}));
    },
    updateNext(): void {
      patchState(store, () => ({query: {next: store.infoResponse().next}}));
    },
    loadByQuery: rxMethod<SearchCharactersParams>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, {isLoading: true})),
        switchMap((query) => {
          return service.searchCharacters(query).pipe(
            tapResponse({
              next: (result) => {
                const character = !!query.next
                  ? [...store.characters(), ...result.results]
                  : result.results;
                patchState(store, {characters: character, infoResponse: result.info});
              },
              error: console.error,
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      )
    ),
  }))
);
