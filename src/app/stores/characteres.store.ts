import {computed, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {tapResponse} from '@ngrx/operators';
import {debounceTime, distinctUntilChanged, pipe, switchMap, tap} from 'rxjs';
import {RickAndMortyService, SearchCharactersParams} from '../services/rick-and-morty/rick-and-morty.service';
import {CharacterModel, RickAndMortySearchInfoModel} from '../services/rick-and-morty/rick-and-morty.model';

interface CharacteresState {
  characters: CharacterModel[];
  infoResponse: Partial<RickAndMortySearchInfoModel>;
  query: SearchCharactersParams;
  isLoading: boolean;
  favorites: Map<number, CharacterModel>;
}

const initialState: CharacteresState = {
  characters: [],
  query: {searchText: ''},
  infoResponse: {},
  isLoading: false,
  favorites: new Map(),
};

export const CharacteresStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed((store) => ({
    favoritesArray: computed(() => Array.from(store.favorites().values())),
  })),
  withMethods((store, service = inject(RickAndMortyService)) => ({
    switchFavorite(character: CharacterModel): void {
      patchState(store, (state) => {
        if (state.favorites.get(character.id)) {
          state.favorites.delete(character.id);
        } else {
          state.favorites.set(character.id, character);
        }
        return {
          favorites: new Map(state.favorites),
        };
      });
    },
    updateSearchText(searchText: string): void {
      patchState(store, () => ({query: {searchText}}));
    },
    updateNext(): void {
      if (store.infoResponse().next) {
        patchState(store, (state) => ({query: {...state.query, next: state.infoResponse.next}}));
      }
    },
    loadByQuery: rxMethod<SearchCharactersParams>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, {isLoading: true})),
        debounceTime(500),
        switchMap((query) => {
          return service.searchCharacters(query).pipe(
            tapResponse({
              next: (result) => {
                const character = !!query.next
                  ? [...store.characters(), ...result.results]
                  : result.results;
                patchState(store, {characters: character, infoResponse: result.info});
              },
              error: () => patchState(store, {characters: [], infoResponse: {}}),
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      )
    ),
  }))
);
