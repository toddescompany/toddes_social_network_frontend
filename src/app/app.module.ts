import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { TemaComponent } from './tema/tema.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { StartComponent } from './start/start.component';
import { MenuEsquerdoComponent } from './menu-esquerdo/menu-esquerdo.component';
import { TendenciasComponent } from './tendencias/tendencias.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ModalModule} from 'ngx-bootstrap/modal'
import { OrderModule} from 'ngx-order-pipe'



@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    FeedComponent,
    TemaComponent,
    TemaDeleteComponent,
    TemaEditComponent,
    PostagemEditComponent,
    PostagemDeleteComponent,
    StartComponent,
    MenuEsquerdoComponent,
    TendenciasComponent,
    PerfilUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
