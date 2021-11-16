import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { StartComponent } from './start/start.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [{path:'', redirectTo: 'entrar', pathMatch:'full'},
{path:'entrar', component: EntrarComponent},
{path:'cadastrar', component: CadastrarComponent},
{path:'feed', component: FeedComponent},
{path:'tema', component: TemaComponent},
{path: 'tema-edit/:idTema', component: TemaEditComponent},
{path: 'tema-delete/:idTema', component: TemaDeleteComponent},
{path: 'start', component: StartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
