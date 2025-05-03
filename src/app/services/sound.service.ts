import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private clickSound: HTMLAudioElement;
  
  constructor() {
    this.clickSound = new Audio();
    this.clickSound.src = '/sounds/click.mp3';
    this.clickSound.load();
  }
  
  playClickSound(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(error => {
      console.warn('Failed to play sound:', error);
    });
  }
}