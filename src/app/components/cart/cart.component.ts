import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { SoundService } from '../../services/sound.service';
import { CartItem } from '../../models/cart-item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  isCheckingOut: boolean = false;
  isPurchaseComplete: boolean = false;
  @Output() closeCart = new EventEmitter<void>();

  constructor(
    private cartService: CartService,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }

  
  closeCartPanel(): void {
    this.soundService.playClickSound();
    this.closeCart.emit();
  }

  removeItem(productId: number): void {
    this.soundService.playClickSound();
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  incrementQuantity(productId: number): void {
    this.soundService.playClickSound();
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  decrementQuantity(productId: number): void {
    this.soundService.playClickSound();
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item && item.quantity > 1) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }

  clearCart(): void {
    this.soundService.playClickSound();
    this.cartService.clearCart();
  }

  checkout(): void {
    this.soundService.playClickSound();
    this.isCheckingOut = true;
  }

  completePurchase(): void {
    this.soundService.playClickSound();
    // Simulate payment processing
    this.isPurchaseComplete = true;
    
    
    setTimeout(() => {
      this.cartService.clearCart();
      this.isCheckingOut = false;
      this.isPurchaseComplete = false;
      this.closeCartPanel(); 
    }, 3500); 
  }
}