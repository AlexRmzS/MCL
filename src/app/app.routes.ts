import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Maid Café Latte - Home'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Maid Café Latte - About Us'
  },
  {
    path: 'menu',
    component: MenuComponent,
    title: 'Maid Café Latte - Our Menu'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Maid Café Latte - Contact Us'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Maid Café Latte - Page Not Found'
  }
];