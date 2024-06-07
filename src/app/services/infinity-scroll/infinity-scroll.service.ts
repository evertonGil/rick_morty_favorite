import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfinityScrollService {
  scroll = new Subject<'up' | 'down'>();
  constructor() { }
}
