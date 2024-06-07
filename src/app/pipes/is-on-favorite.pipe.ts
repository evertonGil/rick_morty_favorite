import {Pipe, PipeTransform} from '@angular/core';
import {CharacterModel} from '../services/rick-and-morty/rick-and-morty.model';

@Pipe({
  name: 'isOnFavorite',
  standalone: true,
})
export class IsOnFavoritePipe implements PipeTransform {
  transform(favorites: CharacterModel[], character: CharacterModel): unknown {
    return favorites.some((fav) => fav.id === character.id);
  }
}
