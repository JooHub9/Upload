import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {PlaylistsComponent} from "./pages/playlists/playlists.component";

const routes: Routes = [
  {path: 'playlist', component: PlaylistComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'categorias', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
