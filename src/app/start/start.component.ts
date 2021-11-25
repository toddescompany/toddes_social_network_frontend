import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css','./start2.component.css']
})
export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  bugViewport()
  {
    document.body.classList.remove("normal")
    document.body.classList.add("bugViewport")
  }
}
