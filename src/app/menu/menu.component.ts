import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foto = environment.foto
  nomeUsuario = environment.nomeUsuario

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }


  sair (){
    //alert("Usuário atualizado com sucesso, faça o login novamente!")
    environment.token=''
    //environment.=''
    environment.foto=''
   // environment.idUsuario=0
    this.router.navigate(['/entrar'])
  }
}
