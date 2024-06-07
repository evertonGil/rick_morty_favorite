import {Component, Input} from '@angular/core';
import {CharacterModel, RickAndMortySearchInfoModel} from '../../services/rick-and-morty/rick-and-morty.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-grid-cards',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CharacterCardComponent],
  templateUrl: './grid-cards.component.html',
  styleUrl: './grid-cards.component.scss',
})
export class GridCardsComponent {
  @Input() public isLoading!: boolean;
  @Input() public characters!: CharacterModel[];
  @Input() public infoResponse?: Partial<RickAndMortySearchInfoModel>;
}
