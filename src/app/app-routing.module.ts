import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommentsComponent} from "./pages/comments/comments.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

const routes: Routes = [
  {path: '', redirectTo: 'navbar',pathMatch: 'full'},
  {path: 'comments', component: CommentsComponent },
  {path: 'navbar', component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
