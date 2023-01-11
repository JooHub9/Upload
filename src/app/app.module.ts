import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import { ChannelpageComponent } from './pages/channelpage/channelpage.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
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
    ChannelpageComponent,
    ChannelsComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterLink,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
