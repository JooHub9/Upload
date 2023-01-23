import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PlaylistComponent} from './pages/playlist/playlist.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {PlaylistsComponent} from './pages/playlists/playlists.component';
import {CommentsComponent} from './pages/comments/comments.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {CommentComponent} from './components/comment/comment.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {VideoComponent} from "./components/video/video.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MenuComponent} from './components/menu/menu.component';
import {HeadlineVideoComponent} from './components/headline-video/headline-video.component';
import {VideopageComponent} from './pages/videopage/videopage.component';
import {FormComponent} from './components/form/form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RandompictureComponent} from './components/randompicture/randompicture.component';
import {CompactBoxComponent} from './components/compact-box/compact-box.component';
import {PlaylistVideosComponent} from './components/playlist-videos/playlist-videos.component';
import {ThematicsComponent} from './pages/thematics/thematics.component';
import {ThematicArticleComponent} from './pages/thematic-article/thematic-article.component';
import {ThematicVideosComponent} from './components/thematic-videos/thematic-videos.component';
import {ChannelpageComponent} from './pages/channelpage/channelpage.component';
import {ChannelsComponent} from './pages/channels/channels.component';
import {FavoritesComponent} from './pages/favorites/favorites.component';
import {TagsPipe} from './tags.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { SanitizePipe } from './sanitize.pipe';
import { LanguageComponent } from './components/language/language.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    CategoriesComponent,
    PlaylistsComponent,
    CommentsComponent,
    CommentComponent,
    NavbarComponent,
    VideoComponent,
    HomepageComponent,
    MenuComponent,
    HeadlineVideoComponent,
    VideopageComponent,
    FormComponent,
    RandompictureComponent,
    CompactBoxComponent,
    PlaylistVideosComponent,
    ThematicsComponent,
    ThematicArticleComponent,
    ThematicVideosComponent,
    ChannelpageComponent,
    ChannelsComponent,
    FavoritesComponent,
    TagsPipe,
    SanitizePipe,
    LanguageComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterLink,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
