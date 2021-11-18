import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema-admin',
  templateUrl: './tema-admin.component.html',
  styleUrls: ['./tema-admin.component.css']
})
export class TemaAdminComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[]


  // order by
  key = 'data'
  reverse = true

  // remover temas
  idTemaASerRemovidaOuEditada: number

  // editar temas
  salvarTema: Tema = new Tema()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private temaService: TemaService,
    private alertas: AlertasService

    ) { }

  ngOnInit() {
    if(environment.token ==''){
      this.alertas.showAlertDanger('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()

/////// MODAIS
    // pega id na URL
    this.idTemaASerRemovidaOuEditada = this.route.snapshot.params['id']
    // atualiza os campos do modal editar sempre que a página atualizar
    if (this.idTemaASerRemovidaOuEditada != undefined)
    this.atualizarCamposModal()
  }

// exibir temas
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }
// cadastrar temas
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

//////////////////////////////////////////////////// MODAIS
// apagar temas
  apagarTema()
  {
    // pega id na URL
    this.idTemaASerRemovidaOuEditada = this.route.snapshot.params['id']
    // deleta a tema
    this.temaService.deleteTema( this.idTemaASerRemovidaOuEditada).subscribe(()=>{
      alert('Tema apagada com sucesso')
      this.router.navigate(['/tema-admin'])
    })
  }

// editar temas
  atualizarTema(){
     // pega id na URL
     this.idTemaASerRemovidaOuEditada = this.route.snapshot.params['id']

    console.log(this.idTemaASerRemovidaOuEditada)
    console.log(this.salvarTema)
    this.temaService.putTema(this.salvarTema).subscribe((resp: Tema) => {
      this.salvarTema = resp
      alert('Tema atualizado com sucesso')
      this.router.navigate(['/tema-admin'])
    })
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.salvarTema = resp
    })
  }
// atualizar temas
  atualizarCamposModal(){
    this.findByIdTema(this.idTemaASerRemovidaOuEditada)

  }


}
