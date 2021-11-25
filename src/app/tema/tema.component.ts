import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
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

  // order by
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService,
    public specialfunctions: SpecialFunctionsService
    ) { }

  ngOnInit() {
    if(environment.token ==''){
      this.alertas.showAlertDanger('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()
  }
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
      this.preencherNav()
    })
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
  preencherNav(){
    //btnCima
    const botaoCima = <HTMLElement> document.getElementById("nav-tab")
    botaoCima.innerHTML='';
    let html = ""
    console.log(this.listaTemas)
    let len = this.listaTemas.length
    for(let i = 0; i < len;i++)
    {
      let tema = this.listaTemas[i].nomeTema



      html += '<div class=" '
      html+= i == 0 ? 'active' : ' '
      html+=' text-secondary fw-bold" id="nav-tema'+this.listaTemas[i].idTema+'-tab" data-toggle="tab" href="#nav-tema'+this.listaTemas[i].idTema+'" role="tab" aria-controls="nav-todasPostagens" aria-selected="'
      html+= i == 0 ? 'true' : 'false'
      html+='">'+tema+'</div>';
    }
    botaoCima.innerHTML+=html
    //tabContents
    const tabContents = <HTMLElement> document.getElementById("nav-tabContent")
    tabContents.innerHTML='';
    html = ""
    len = this.listaTemas.length
    for(let i = 0; i < len;i++)
    {



      html +='<div class="tab-pane fade '
      html+= i == 0 ? 'active show' : ' '
      html+='" id="nav-tema'+this.listaTemas[i].idTema+'" role="tabpanel" aria-labelledby="nav-todasPostagens-tab">'
      for(let p = 0;p < this.listaTemas[i].postagem.length;p++)
      {
      html += '<article class="col-12 pt-2 pb-2"><div class="bg-white border mt-2"><div><div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom"><div class="d-flex flex-row align-items-center feed-text px-2"><img class="rounded-circle" src="'+this.listaTemas[i].postagem[p].fk_usuario.foto+'" width="45" onerror="this.src=\'../../assets/toddes_icons/sem_imagem.jpg\';"><div class="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">'+this.listaTemas[i].postagem[p].fk_usuario.nomeUsuario+'</span><span class="time">'+ this.specialfunctions.calculaADiferencaEntreDatas(this.listaTemas[i].postagem[p].data_postagem.toString())+'</span><span class="font-weight-bold titulo">'+this.listaTemas[i].postagem[p].tituloPostagem+'</span></div></div></div></div><div class="p-2 px-3"><span>'+this.listaTemas[i].postagem[p].texto_postagem+'</span></div>'

      if (this.listaTemas[i].postagem[p].imagem)
      {
      html += '<div class="p-2 px-3"><span><img src="'+this.listaTemas[i].postagem[p].imagem+'" class="img-post-responsive-size"  onerror="this.src=\'../../assets/toddes_icons/sem_imagem.jpg\';"> </span></div>'
      }
      html+= '<span class="tema">'+this.listaTemas[i].nomeTema+'</span>'
      html += '</div></article>'
      }
      html+="</div>"


    }
    tabContents.innerHTML+=html

  }



}
