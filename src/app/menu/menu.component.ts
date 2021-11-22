import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { MainBroadcastService } from '../broadcast/main-broadcast.service';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foto = environment.foto
  nomeUsuario = environment.nomeUsuario
  idUsuario = environment.id
  emailUsuario = environment.emailUsuario
  confirmSenha: string
  senha: string
  tipoUsuario: string
  senhaAntiga: string

  // editar temas
  salvarUser: User = new User()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertas: AlertasService,
    private broadcast: MainBroadcastService
  ) { }

  ngOnInit() {
    this.atualizarCamposModal()
    //this.salvarUser.senhaUsuario=''
  }

//////////////////////////////////////////////////// MODAIS
// apagar temas
apagarUser()
{
  // deleta a tema
  this.authService.deleteUser( this.idUsuario).subscribe(()=>{
    this.alertas.showAlertSuccess('Conta desativada com sucesso')
    this.sair()
  })
}

// editar user
atualizarUser(){

    if(this.salvarUser.foto=='')
    this.salvarUser.foto='../../assets/toddes_icon/sem_imagem.jpg';

    // verificar senha




    if(this.salvarUser.senhaUsuario != this.confirmSenha){
      this.alertas.showAlertDanger('As senhas digitadas são inválidas, ou não correspondem')
    }

  else
  {
    this.authService.cadastrar(this.salvarUser).subscribe((resp: User) => {
      this.salvarUser = resp
      this.alertas.showAlertSuccess('Usuário atualizado com sucesso! Você tem que logar novamente!')
      this.sair()
    })
  }
}
findByIdUser(id: number){
  this.authService.getByIdUser(id).subscribe((resp: User) =>{
    this.salvarUser = resp
  })
}

// atualizar user
atualizarCamposModal(){
  this.findByIdUser(this.idUsuario)
  //this.senhaAntiga =   this.salvarUser.senhaUsuario
  //this.salvarUser.senhaUsuario=''
}

// extra user
confirmeSenha(event: any){
  this.confirmSenha = event.target.value

}
senhaNormal(event: any){
  this.senha = event.target.value

}

tipoUser(event: any){
  this.tipoUsuario=event.target.value
}


//sair
  sair (){
    //alert("Usuário atualizado com sucesso, faça o login novamente!")
    environment.token=''
    environment.nomeUsuario=''
    environment.foto=''
    environment.id=0
  }


  // emitirPesquisa
  emitirPesquisa(event: any) {
    this.router.navigate(['/feed'])
    this.broadcast.emitirPalavrasDaPesquisa(event.target.value)

  }
}
