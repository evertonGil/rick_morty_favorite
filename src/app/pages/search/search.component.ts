import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import '@material/web/textfield/outlined-text-field.js';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, tap} from 'rxjs';
import {TextFieldComponent} from '../../components/text-field/text-field.component';
import {CharacterModel, RickAndMortySearchInfoModel} from '../../services/rick-and-morty.model';
import {RickAndMortyService, SearchCharactersParams} from '../../services/rick-and-morty.service';
import {InfinityScrollService} from '../../services/infinity-scroll.service';
import {CharacteresStore} from '../../stores/characteres.store';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TextFieldComponent, ReactiveFormsModule,],
  providers: [RickAndMortyService, CharacteresStore],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private readonly infityScrollService = inject(InfinityScrollService);
  private readonly fomBuilder = inject(FormBuilder);
  // private readonly rickAnMortyService = inject(RickAndMortyService);
  readonly store = inject(CharacteresStore);

  form: FormGroup<{search: FormControl<string | null>}> = this.fomBuilder.group({
    search: [''],
  });
  // characters = signal<CharacterModel[]>([]);
  // searchInfo?: RickAndMortySearchInfoModel;

  public ngOnInit() {
    const query = this.store.query;
    // this.searchCharacters({searchText: ''});
    this.onSearchChange();
    this.store.loadByQuery(query);
    this.onScrollDown();
  }

  private searchCharacters(params: SearchCharactersParams) {
    // this.rickAnMortyService
    //   .searchCharacters(params)
    //   .pipe(tap((result) => this.characters.set(result.results)))
    //   .pipe(tap((result) => (this.searchInfo = result.info)))
    //   .subscribe();
  }

  private onSearchChange() {
    this.form.controls.search.valueChanges
      .pipe(
        debounceTime(500),
        tap((value) => this.store.updateSearchText(value ?? ''))
      )
      .subscribe();
  }

  public onScrollDown() {
    this.infityScrollService.scroll
      .pipe(
        tap(() => {
          this.store.updateNext();
        })
      )
      .subscribe();
    // if (this.searchInfo?.next) {
    //   this.searchCharacters({next: this.searchInfo?.next});
    // }
  }
}
