import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {PlaylistsComponent} from "./pages/playlists/playlists.component";
import {CommentsComponent} from "./pages/comments/comments.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {VideopageComponent} from "./pages/videopage/videopage.component";
import {ThematicsComponent} from "./pages/thematics/thematics.component";

const routes: Routes = [
  {path: '', redirectTo: 'homepage',pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent },
  {path: 'comments', component: CommentsComponent },
  {path: 'videopage/:id_video', component: VideopageComponent },
  {path: 'playlists/:nid', component: PlaylistComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'thematics', component: ThematicsComponent},
  {path: 'categorias', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
