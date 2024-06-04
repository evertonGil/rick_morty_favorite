import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { InfinityScrollService } from './services/infinity-scroll.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainNavComponent, InfiniteScrollDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly infityScrollService = inject(InfinityScrollService);
  title = 'rick-morty-favorite';

  public onScrollDown() {
    this.infityScrollService.scroll.next('down');
  }
}
