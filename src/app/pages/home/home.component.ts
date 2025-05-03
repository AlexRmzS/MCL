import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { SoundService } from '../../services/sound.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
     
      const featuredIds = [1, 3, 6]; 
      this.featuredProducts = products.filter(product => 
        featuredIds.includes(product.id)
      );
      
      if (this.featuredProducts.length < 3) {
        const remaining = products
          .filter(p => !featuredIds.includes(p.id))
          .slice(0, 3 - this.featuredProducts.length);
        
        this.featuredProducts = [...this.featuredProducts, ...remaining];
      }
    });
  }

  addToCart(product: Product): void {
    this.soundService.playClickSound();
    this.cartService.addToCart(product, 1);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'added-notification';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);
    
    // Force a reflow to trigger animation
    notification.offsetHeight;
    
    // Show the notification
    notification.classList.add('show');
    
    // Hide and remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 2000);
  }
}