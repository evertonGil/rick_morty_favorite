import {Component, Input, computed, inject} from '@angular/core';
import {CharacterModel} from '../../services/rick-and-morty/rick-and-morty.model';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {CharacteresStore} from '../../stores/characteres.store';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() public character!: CharacterModel;
  public readonly store = inject(CharacteresStore);
  public readonly faHeart = faHeart;
  public readonly faHeartSolid = faHeartSolid;
  public favorited = computed(() => this.store.favorites().get(this.character.id));

  onclickFavorite() {
    this.store.switchFavorite(this.character);
  }
}
