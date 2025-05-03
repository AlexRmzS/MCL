import { Component, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SoundService } from '../../services/sound.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  cartCount = 0;
  @Output() cartClick = new EventEmitter<void>();

  constructor(
    private cartService: CartService,
    private soundService: SoundService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  playSound(): void {
    this.soundService.playClickSound();
  }

  toggleMenu(): void {
    this.playSound();
    this.menuOpen = !this.menuOpen;
    // Disable body scroll when menu is open
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  openCart(): void {
    this.playSound();
    this.cartClick.emit();
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle') && this.menuOpen) {
      this.closeMenu();
    }
  }

  // Close menu on escape key
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.menuOpen) {
      this.closeMenu();
    }
  }
}