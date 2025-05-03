import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Classic Latte',
      description: 'Smooth espresso with steamed milk topped with a light layer of foam',
      price: 4.50,
      imageUrl: '/coffee1.jpg',
      category: 'coffee'
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Equal parts espresso, steamed milk, and milk foam',
      price: 4.75,
      imageUrl: '/coffee2.jpg',
      category: 'coffee'
    },
    {
      id: 3,
      name: 'Strawberry Cake',
      description: 'Light and fluffy cake layered with fresh strawberries and cream',
      price: 6.50,
      imageUrl: '/cake1.jpg',
      category: 'dessert'
    },
    {
      id: 4,
      name: 'Matcha Green Tea',
      description: 'Premium Japanese matcha whisked to perfection',
      price: 5.25,
      imageUrl: '/tea1.jpg',
      category: 'tea'
    },
    {
      id: 5,
      name: 'Chocolate Parfait',
      description: 'Layers of chocolate mousse, whipped cream, and chocolate sauce',
      price: 7.50,
      imageUrl: '/dessert1.jpg',
      category: 'dessert'
    },
    {
      id: 6,
      name: 'Kawaii Omurice',
      description: 'Japanese omelette filled with fried rice and decorated with cute designs',
      price: 12.75,
      imageUrl: '/food1.jpg',
      category: 'food'
    },
    {
      id: 7,
      name: 'Maid Special Bento',
      description: 'Assorted Japanese dishes arranged in a cute bento box',
      price: 15.99,
      imageUrl: '/food2.jpg',
      category: 'food'
    },
    {
      id: 8,
      name: 'Cat Latte Art',
      description: 'Our signature latte with adorable cat art on top',
      price: 5.50,
      imageUrl: '/coffee3.jpg',
      category: 'coffee'
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const products = this.products.filter(p => p.category === category);
    return of(products);
  }
}