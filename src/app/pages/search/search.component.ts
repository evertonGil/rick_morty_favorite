import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject} from '@angular/core';
import '@material/web/textfield/outlined-text-field.js';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Subject, debounceTime, takeUntil, tap} from 'rxjs';
import {TextFieldComponent} from '../../components/text-field/text-field.component';
import {RickAndMortyService} from '../../services/rick-and-morty/rick-and-morty.service';
import {InfinityScrollService} from '../../services/infinity-scroll/infinity-scroll.service';
import {CharacteresStore} from '../../stores/characteres.store';
import {GridCardsComponent} from '../../components/grid-cards/grid-cards.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TextFieldComponent, ReactiveFormsModule, GridCardsComponent],
  providers: [RickAndMortyService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly infityScrollService = inject(InfinityScrollService);
  private readonly fomBuilder = inject(FormBuilder);
  readonly store = inject(CharacteresStore);

  form: FormGroup<{search: FormControl<string | null>}> = this.fomBuilder.group({
    search: [this.store.query().searchText ?? ''],
  });
  private readonly untilDestroy$ = new Subject<void>();

  public ngOnInit() {
    const query = this.store.query;
    this.onSearchChange();
    this.store.loadByQuery(query);
    this.onScrollDown();
  }

  ngOnDestroy(): void {
    this.untilDestroy$.next();
    this.untilDestroy$.complete();
  }

  private onSearchChange() {
    this.form.controls.search.valueChanges
      .pipe(
        takeUntil(this.untilDestroy$),
        debounceTime(500),
        tap((value) => this.store.updateSearchText(value ?? ''))
      )
      .subscribe();
  }

  public onScrollDown() {
    this.infityScrollService.scroll
      .pipe(
        takeUntil(this.untilDestroy$),
        tap(() => {
          this.store.updateNext();
        })
      )
      .subscribe();
  }
}
