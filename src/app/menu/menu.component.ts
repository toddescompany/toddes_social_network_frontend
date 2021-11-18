import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  foto = environment.foto
  nomeUsuario = environment.nomeUsuario
  id = environment.id
  confirmSenha: string
  tipoUsuario: string

  // remover temas
  idUserASerRemovidoOuEditado: number

  // editar temas
  salvarUser: User = new User()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    /////// MODAIS
    // pega id na URL
    this.idUserASerRemovidoOuEditado = this.route.snapshot.params['id']
    // atualiza os campos do modal editar sempre que a página atualizar
    if (this.idUserASerRemovidoOuEditado != undefined)
    this.atualizarCamposModal()
  }

//////////////////////////////////////////////////// MODAIS
// apagar temas
apagarUser()
{
  // pega id na URL
  this.idUserASerRemovidoOuEditado = this.route.snapshot.params['id']
  // deleta a tema
  this.authService.deleteUser( this.idUserASerRemovidoOuEditado).subscribe(()=>{
    alert('Tema apagada com sucesso')
    this.router.navigate(['/tema-admin'])
  })
}

// editar user
atualizarTema(){
   // pega id na URL
   this.idUserASerRemovidoOuEditado = this.route.snapshot.params['id']

  console.log(this.idUserASerRemovidoOuEditado)
  console.log(this.salvarUser)
  this.authService.putUser(this.salvarUser).subscribe((resp: User) => {
    this.salvarUser = resp
    alert('Tema atualizado com sucesso')
    this.router.navigate(['/tema-admin'])
  })
}
findByIdUser(id: number){
  this.authService.getByIdUser(id).subscribe((resp: User) =>{
    this.salvarUser = resp
  })
}

// atualizar user
atualizarCamposModal(){
  this.findByIdUser(this.idUserASerRemovidoOuEditado)

}

// extra user
confirmeSenha(event: any){
  this.confirmSenha = event.target.value

}

tipoUser(event: any){
  this.tipoUsuario=event.target.value
}


//sair
  sair (){
    //alert("Usuário atualizado com sucesso, faça o login novamente!")
    environment.token=''
    //environment.=''
    environment.foto=''
   // environment.idUsuario=0
    this.router.navigate(['/entrar'])
  }
}
