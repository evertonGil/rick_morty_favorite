import {Component, inject} from '@angular/core';
import {GridCardsComponent} from '../../components/grid-cards/grid-cards.component';
import {CharacteresStore} from '../../stores/characteres.store';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [RouterModule, GridCardsComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent {
  readonly store = inject(CharacteresStore);
}
