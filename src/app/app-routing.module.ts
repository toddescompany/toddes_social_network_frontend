import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { StartComponent } from './start/start.component';
import { TemaAdminComponent } from './tema-admin/tema-admin.component';
import { TemaComponent } from './tema/tema.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [{path:'', redirectTo: 'entrar', pathMatch:'full'},
{path:'entrar', component: EntrarComponent},
{path:'cadastrar', component: CadastrarComponent},
{path:'feed', component: FeedComponent},
{path:'tema', component: TemaComponent},
{path: 'tema-edit/:idTema', component: TemaEditComponent},
{path: 'tema-delete/:idTema', component: TemaDeleteComponent},
{path: 'postagem-edit/:id', component: PostagemEditComponent},
{path: 'postagem-delete/:id', component: PostagemDeleteComponent},
{path: 'start', component: StartComponent},
{path: 'perfil-usuario/:id', component: PerfilUsuarioComponent},
{path: 'teste', component: TesteComponent},
{path: 'user-edit/:id', component: UserEditComponent},
{path: 'tema-admin', component: TemaAdminComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
