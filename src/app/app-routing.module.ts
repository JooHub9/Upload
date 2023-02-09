import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {PlaylistsComponent} from "./pages/playlists/playlists.component";
import {CommentsComponent} from "./pages/comments/comments.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {VideopageComponent} from "./pages/videopage/videopage.component";
import {ThematicsComponent} from "./pages/thematics/thematics.component";
import {ChannelpageComponent} from "./pages/channelpage/channelpage.component";
import {ChannelsComponent} from "./pages/channels/channels.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {ThematicArticleComponent} from "./pages/thematic-article/thematic-article.component";
import {LanguageComponent} from "./components/language/language.component";
import {TagpageComponent} from "./pages/tagpage/tagpage.component";
import {SearchpageComponent} from "./pages/searchpage/searchpage.component";

const routes: Routes = [
  {path: '', redirectTo: 'homepage',pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent },
  {path: 'comments', component: CommentsComponent },
  {path: 'video/:title', component: VideopageComponent},
  {path: 'playlists/:nid', component: PlaylistComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'thematics', component: ThematicsComponent},
  {path: 'thematics/:nid', component: ThematicArticleComponent},
  {path: 'channel/:title', component: ChannelpageComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'categorias', component: CategoriesComponent},
  {path: 'language', component: LanguageComponent},
  {path: 'tag/:tag', component: TagpageComponent},
  {path: 'search', component:SearchpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
