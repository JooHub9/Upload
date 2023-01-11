import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from "./pages/comments/comments.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {VideopageComponent} from "./pages/videopage/videopage.component";
import {ChannelpageComponent} from "./pages/channelpage/channelpage.component";
import {ChannelsComponent} from "./pages/channels/channels.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";

const routes: Routes = [
  {path: '', redirectTo: 'homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'comments', component: CommentsComponent},
  {path: 'videopage/:id_video', component: VideopageComponent},
  {path: 'channelpage/:id_channel', component: ChannelpageComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'favorites', component: FavoritesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
