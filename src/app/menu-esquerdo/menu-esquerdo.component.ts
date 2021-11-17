import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu-esquerdo',
  templateUrl: './menu-esquerdo.component.html',
  styleUrls: ['./menu-esquerdo.component.css']
})
export class MenuEsquerdoComponent implements OnInit {
  
  idUsuario = environment.id
  constructor() { }

  ngOnInit(): void {
  }

}
