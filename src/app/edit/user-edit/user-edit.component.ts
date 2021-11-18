import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmeSenha(event: any){
    this.confirmSenha = event.target.value

  }

  tipoUser(event: any){
    this.tipoUsuario=event.target.value
  }

  atualizar(){
    this.user.tipo = this.tipoUsuario


    if(this.user.senhaUsuario != this.confirmSenha){
      this.alertas.showAlertInfo('senhas diferentes')
    }
    else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user =resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuario atualizado com sucesso, faça o login novamente!')
        environment.token=''
        environment.foto=''
        this.router.navigate(['/entrar'])
      })
    }

  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) =>{
      this.user = resp
    })
  }

}
