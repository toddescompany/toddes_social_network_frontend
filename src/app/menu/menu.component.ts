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
  salvarUser: User = new User()
  tempUser: User = new User()
  // img personalizado
  previaFotoDePerfil: string

  // editar temas

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertas: AlertasService,
    private broadcast: MainBroadcastService
  ) { }


  ngOnInit() {
    this.atualizarCamposModal()

// zera o campo de repita a senha
  this.tempUser = this.salvarUser

 // add os eventos de click e toggle das preIMG
 this.prepararPreIMGParaFuncionar()


 const txtConfirmarSenha = <HTMLInputElement> document.getElementById("txtConfirmarSenha")
      txtConfirmarSenha.addEventListener("click",()=>{
      txtConfirmarSenha.value=""
 })



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
  this.sair()
  this.router.navigate(['/entrar'])

}

// editar user
atualizarUser(){
  const txtSenhaNormal = <HTMLInputElement> document.getElementById("txtSenhaNormal")
  const txtConfirmarSenha = <HTMLInputElement> document.getElementById("txtConfirmarSenha")



    if(this.salvarUser.foto=='')
    this.salvarUser.foto='../../assets/toddes_icon/sem_imagem.jpg'

    this.salvarUser.foto = this.previaFotoDePerfil

    // verificar senha
    if(this.confirmSenha != this.salvarUser.senhaUsuario)
    {
            this.alertas.showAlertDanger('As senhas digitadas são inválidas, ou não correspondem')
            return;
    }


    this.authService.cadastrar(this.salvarUser).subscribe((resp: User) => {
      this.salvarUser = resp
      this.alertas.showAlertSuccess('Usuário atualizado com sucesso! Você tem que logar novamente!')
      this.sair()
      this.router.navigate(['/entrar'])
      window.location.reload()
    })




}
findByIdUser(id: number){
  this.authService.getByIdUser(id).subscribe((resp: User) =>{

    this.salvarUser = resp

  })
}

// atualizar user
atualizarCamposModal(){
  this.findByIdUser(this.idUsuario)
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

// imgs personalizado
// carregar por link
checaOLink(event: any)
{
  this.previaFotoDePerfil = event.target.value
  const previa = document.querySelector("#previaDaImagemCarregada img")
  //console.log(this.previaFotoDePerfil)
  previa?.setAttribute("src",this.previaFotoDePerfil)
  const txtResultadoImagem = <HTMLElement>document.getElementById('resultadoCarregamentoImagem')
  txtResultadoImagem.innerHTML = "Imagem Válida!"
}

// carregar pré-definidas
prepararPreIMGParaFuncionar()
{
  const preIMG = document.querySelectorAll(".preIMG")
  for(let i = 0; i < preIMG.length;i++)
  {
    preIMG[i].addEventListener("click",()=>{

      // limpa outras seleções
      this.limpaPreIMG()
      // seleciona a imagem clicada
      preIMG[i].classList.add("preIMGActive")
      // exibe a imagem de perfil
        const previa = <HTMLImageElement>document.querySelector("#previaDaImagemCarregada img")
        const preIMGActive = <HTMLImageElement>preIMG[i]
        this.previaFotoDePerfil = preIMGActive.src
        previa.src = this.previaFotoDePerfil

    })
  }
}

limpaPreIMG(){
  const preIMG = document.querySelectorAll(".preIMGActive")
  for(let i = 0; i < preIMG.length;i++)
  {
    preIMG[i].classList.remove("preIMGActive")
  }
}

zeraCarregamentoDeImagem(){
  // zera link
  const txtLink = <HTMLInputElement>document.getElementById('linkImagem')
  txtLink.value=""


  // zera seleção pré-definida

  // zera upload

  // volta pra imagem prévia padrão
  const previa = document.querySelector("#previaDaImagemCarregada img")
  previa?.setAttribute("src","../../assets/toddes_icons/no_photo.jpg")

    // zera o textinho de validação
    const txtResultadoImagem = <HTMLElement>document.getElementById('resultadoCarregamentoImagem')
    txtResultadoImagem.innerHTML = ""


}

removerEspacos(event: any){
  const input = <HTMLInputElement> event.target
  this.salvarUser.emailUsuario = input.value.replace(' ','')

}


}
