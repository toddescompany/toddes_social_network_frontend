import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  user: User = new User()
  idUsuario = environment.id

  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit(){
    if(environment.token ==''){
      alert('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }
    this.findByIdUser()
  }

  findByIdUser(){
    this.authservice.getByIdUser(this.idUsuario).subscribe((resp: User)=>{
      this.user = resp
    })
  }
}
