import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { MainBroadcastService } from '../broadcast/main-broadcast.service';




@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  user: User =new User
  confirmSenha: string
  tipoUsuario:string
  listaUsuario: User[]



  constructor(
    private authService: AuthService,
    private router: Router,
    private receptor: MainBroadcastService,
    private alertas: AlertasService
    ) { }

  ngOnInit() {
    window.scroll (0,0)
    this.findByUser()


  }
  confirmeSenha(event: any){
    this.confirmSenha = event.target.value

  }

  tipoUser(event: any){
    this.tipoUsuario=event.target.value
  }

findByUser(){
  this.authService.getByUserUser(this.user.emailUsuario).subscribe((resp: User[])=>{
    this.listaUsuario =resp
  })
}


  cadastrar(){
    // verificar se o nome de usuário digitado já existe
    console.table(this.listaUsuario)
    let jaTemIgual = 0
    for(let i = 0; i < this.listaUsuario.length;i++)
    {
      if (this.listaUsuario[i].emailUsuario ==this.user.emailUsuario){
        this.alertas.showAlertDanger('Nome de usuario já cadastrado!')
        jaTemIgual = 1;
        break;
      }
    }

    if(jaTemIgual == 0)
    {
          this.user.tipo = this.tipoUsuario
          if(this.user.foto=='')
            this.user.foto='../../assets/toddes_icon/sem_imagem.jpg';

          if(this.user.senhaUsuario != this.confirmSenha){
            this.alertas.showAlertInfo('senhas diferentes')
          }
          else{
            this.authService.cadastrar(this.user).subscribe((resp: User) => {
              this.user =resp
              this.router.navigate(['/entrar'])
              this.alertas.showAlertSuccess('Usuario cadastrado com sucesso!')
            }, erro=>{
              if(erro.status == 500){
                this.alertas.showAlertInfo('Os campos não foram preenchidos corretamente')
              }
          })
          }
    }




//this.authService.getByUserUser(this.user.emailUsuario)


  }



}
