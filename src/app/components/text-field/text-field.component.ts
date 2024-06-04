import {CUSTOM_ELEMENTS_SCHEMA, Component, signal, ChangeDetectionStrategy, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor {
  value = signal('');
  disabled = signal<boolean>(false);
  public _onChange!: (value: any) => void;
  public _onTouch!: () => void;

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._onChange(inputElement.value);
  }
}
