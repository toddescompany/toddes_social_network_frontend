import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema-admin',
  templateUrl: './tema-admin.component.html',
  styleUrls: ['./tema-admin.component.css']
})
export class TemaAdminComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[]


  // order by
  key = 'data'
  reverse = true

  constructor(
    private router: Router, 
    private temaService: TemaService,
    private alertas: AlertasService
    ) { }

  ngOnInit() {
    if(environment.token ==''){
      this.alertas.showAlertDanger('sua sessão expirou.')
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
      this.alertas.showAlertSuccess ('tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }
}
