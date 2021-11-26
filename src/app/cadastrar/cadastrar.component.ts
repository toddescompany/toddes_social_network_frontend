import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { MainBroadcastService } from '../broadcast/main-broadcast.service';




@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css','./cadastrar2.component.css']
})
export class CadastrarComponent implements OnInit {
  user: User =new User
  confirmSenha: string
  tipoUsuario:string
  listaUsuario: User[]
  previaFotoDePerfil = '../../assets/toddes_icons/no_photo.jpg'



  constructor(
    private authService: AuthService,
    private router: Router,
    private receptor: MainBroadcastService,
    private alertas: AlertasService
    ) { }

  ngOnInit() {
    window.scroll (0,0)
    this.findByUser()
    document.body.classList.remove("normal")
    document.body.classList.add("bugViewport2")

    // add os eventos de click e toggle das preIMG
    this.prepararPreIMGParaFuncionar()
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
    //console.table(this.listaUsuario)
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
          this.user.foto = this.previaFotoDePerfil

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

bugViewport()
{
  document.body.classList.remove("bugViewport2")
  document.body.classList.add("bugViewport")
}

// Trabalha a foto para ser enviada

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




//



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





}
