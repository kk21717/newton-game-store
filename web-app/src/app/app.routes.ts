import { Routes } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { EditComponent } from './pages/edit/edit.component';
import { ViewComponent } from './pages/view/view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
  { path: 'browse', component: BrowseComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'edit', component: EditComponent },
  { path: '**', redirectTo: '/browse' }
];
