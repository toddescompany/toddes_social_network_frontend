import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  // order by
  key = 'data'
  reverse = true

  constructor(private router: Router, private temaService: TemaService) { }

  ngOnInit() {
    if(environment.token ==''){
      alert('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()
  }
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.tema.descricao = ' '
    this.tema.subtemaTema = ' '
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert ('tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

}
