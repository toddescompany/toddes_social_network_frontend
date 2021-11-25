import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { MainBroadcastService } from '../broadcast/main-broadcast.service';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { SpecialFunctionsService } from '../service/special-functions.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  tipoUsuario = environment.tipoUsuario
  idJumpTema = -1

  // order by
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService,
    public specialfunctions: SpecialFunctionsService,
    private broadcast: MainBroadcastService
    ) { }

  ngOnInit() {
    if(environment.token ==''){
      this.alertas.showAlertDanger('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }
    this.findAllTemas()
    window.addEventListener('popstate', (event) => {
      this.sair()
      this.alertas.showAlertDanger('sua sessão expirou.')
      document.location.reload();
    });

    setTimeout(()=>{

      if(this.idJumpTema == -1)
      {
        const first = document.querySelectorAll(".scrollmenu a")[0]
        first.classList.add("temaAtivo")
        this.carregaPostsPorTema(0)
      }

    },500)

      // algo algo for digitado para pesquisar, muda a cor do botao
      this.broadcast.emissorDeTema.subscribe((resp : number)=>{
        this.idJumpTema = resp

        /*setTimeout(()=>{
          this.salteParaOTema()
        },1000)
*/
      }
      );

  }
  sair (){
    //alert("Usuário atualizado com sucesso, faça o login novamente!")
    environment.token=''
    environment.nomeUsuario=''
    environment.foto=''
    environment.id=0

  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp


    })

  }

  salteParaOTema( )
  {


    this.limpaTemasAtivos()
    const el = document.getElementsByClassName("temasItem")[this.idJumpTema - 1]
    console.log(el)
    el.classList.add("temaAtivo")
    this.carregaPostsPorTema(el)
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

  replaceAll(str: string, find: string, replace:string) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }
  carregaPostsPorTema(event: any){
    /*
    //btnCima
    const botaoCima = <HTMLElement> document.getElementById("temasParaFiltrar")
    botaoCima.innerHTML='';
    let html = ""
    console.log(this.listaTemas)
    let len = this.listaTemas.length
    for(let i = 0; i < len;i++)
    {
      let tema = this.listaTemas[i].nomeTema



      html += '<a class=" '
      html+= i == 0 ? 'active' : ' '
      html+=' " id="nav-tema'+this.listaTemas[i].idTema+'-tab"  href="#nav-tema'+this.listaTemas[i].idTema+'"'
      html+='">'+tema+'</a>';
    }
    botaoCima.innerHTML+=html
*/
    // carrega posts ao clicar
    const postsPorTema = <HTMLElement> document.getElementById("postsPorTema")
    postsPorTema.innerHTML='';
    let html = ""
    let len = this.listaTemas.length
    let temaClicado = typeof event == "number" ? event : event.target.name
    let i = temaClicado

    if(this.listaTemas[i].postagem.length == 0)
    {
      html='<div class="semPostagem" class="col-12"><i class="far fa-frown"></i><h4>Nenhuma postagem cadastrada nessa Hashtag ainda!</h4></div>'
      postsPorTema.innerHTML=html
    }
    else
    {
          for(let p = 0;p < this.listaTemas[i].postagem.length;p++)
          {
              html += '<article class="col-12 pt-2 pb-2"><div class="bg-white border mt-2"><div><div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom"><div class="d-flex flex-row align-items-center feed-text px-2"><img class="rounded-circle" src="'+this.listaTemas[i].postagem[p].fk_usuario.foto+'" width="45" onerror="this.src=\'../../assets/toddes_icons/sem_imagem.jpg\';"><div class="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">'+this.listaTemas[i].postagem[p].fk_usuario.nomeUsuario+'</span><span class="time">'+ this.specialfunctions.calculaADiferencaEntreDatas(this.listaTemas[i].postagem[p].data_postagem.toString())+'</span><span class="font-weight-bold titulo">'+this.listaTemas[i].postagem[p].tituloPostagem+'</span></div></div></div></div><div class="p-2 px-3"><span>'+this.listaTemas[i].postagem[p].texto_postagem+'</span></div>'

              if (this.listaTemas[i].postagem[p].imagem)
              {
              html += '<div class="p-2 px-3"><span><img src="'+this.listaTemas[i].postagem[p].imagem+'" class="expandirIMG img-post-responsive-size" alt="'+this.listaTemas[i].postagem[p].tituloPostagem+'"  onerror="this.src=\'../../assets/toddes_icons/sem_imagem.jpg\';"> </span></div>'
              }
              html+= '<span class="tema">'+this.listaTemas[i].nomeTema+'</span>'
              html += '</div></article>'
          }
          html+="</div>"

        postsPorTema.innerHTML+=html

        // eventlistener
        var imgs = document.getElementsByClassName("expandirIMG")
        for(let i = 0; i < imgs.length;i++)
        {
          imgs[i].addEventListener("click",() =>
          {
            this.specialfunctions.expandirIMG(imgs[i])
          })
        }
  }
}

btnPostClicado(event: any)
{
  this.carregaPostsPorTema(event)
  this.limpaTemasAtivos()
}

dinamicaCores(event : any){
  const btns =  document.getElementsByClassName("temaAtivo");
  for (let i = 0; i < btns.length;i++)
  btns[i].classList.remove("temaAtivo")
}
limpaTemasAtivos(){
  const btns =  document.getElementsByClassName("temaAtivo");
  for (let i = 0; i < btns.length;i++)
  btns[i].classList.remove("temaAtivo")
}

}
