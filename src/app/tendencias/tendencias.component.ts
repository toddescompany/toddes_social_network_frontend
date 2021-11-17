import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {

  listaPostagens: Postagem[]

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.getAllPostagens()
  }

  getAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })

  }



}
