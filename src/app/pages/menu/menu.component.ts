import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      
      // Extract unique categories
      const categorySet = new Set<string>();
      products.forEach(product => categorySet.add(product.category));
      this.categories = Array.from(categorySet);
    });
  }
  
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }
  
  addToCart(product: Product): void {
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