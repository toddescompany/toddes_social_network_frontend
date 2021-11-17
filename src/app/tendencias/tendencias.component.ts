import { Component, Input, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {

  @Input() listaPostagens: Postagem[]

  constructor() { }

  ngOnInit(): void {

  }



}
