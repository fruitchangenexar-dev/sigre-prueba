import { EventEmitter, Injectable } from '@angular/core';
import { Maquina } from '../models/maquina';

@Injectable({
  providedIn: 'root',
})
export class SharingMaquinaService {
  private _newMaquinaEventEmitter: EventEmitter<Maquina> = new EventEmitter();

  private _idMaquinaEventEmitter = new EventEmitter();

  private _findMaquinaByIdEventEmitter = new EventEmitter();

  private _selectMaquinaEventEmitter = new EventEmitter();

  constructor() {}

  get selectMaquinaEventEmitter() {
    return this._selectMaquinaEventEmitter;
  }

  get findMaquinaByIdEventEmitter() {
    return this._findMaquinaByIdEventEmitter;
  }

  get newMaquinaEventEmitter(): EventEmitter<Maquina> {
    return this._newMaquinaEventEmitter;
  }

  get idMaquinaEventEmitter(): EventEmitter<string> {
    return this._idMaquinaEventEmitter;
  }
}
