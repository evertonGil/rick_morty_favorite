import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { CharacteresStore } from '../../stores/characteres.store';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [ RouterModule, FontAwesomeModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss'
})
export class MainNavComponent {
  public readonly store = inject(CharacteresStore);
  public readonly faHome = faHome;
  public readonly faHeart = faHeart;
}
