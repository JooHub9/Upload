import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommentsComponent} from "./pages/comments/comments.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {VideopageComponent} from "./pages/videopage/videopage.component";

const routes: Routes = [
  {path: '', redirectTo: 'homepage',pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent },
  {path: 'comments', component: CommentsComponent },
  {path: 'videopage/:id_video', component: VideopageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
