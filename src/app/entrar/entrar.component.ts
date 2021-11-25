import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
    ) { }

  ngOnInit() {
    document.body.classList.remove("normal")
    document.body.classList.add("bugViewport")

    this.router.navigate(['/entrar'])
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=> {
      this.userLogin = resp

      document.body.classList.remove("bugViewport")
      document.body.classList.add("normal")


      // definindo variáveis globais
        environment.token = this.userLogin.token
        environment.nomeUsuario = this.userLogin.nomeUsuario
        environment.login = this.userLogin.emailUsuario
        environment.emailUsuario = this.userLogin.emailUsuario
        environment.foto = this.userLogin.foto
        environment.id = this.userLogin.id
        environment.tipoUsuario = this.userLogin.tipo

      // mudando o layout depois de logar, para deixar as barras fixas
      this.router.navigate(['/feed'])
    }, erro=>{
      if(erro.status == 500){
        this.alertas.showAlertInfo('Usuario ou senha incorretos')
      }
    })
  }
}
