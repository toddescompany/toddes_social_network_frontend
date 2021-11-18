import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/User';

import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  idUser: number
  user: User = new User()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token ==''){
      alert('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUser)
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  apagarUsuario(){
    this.authService.deleteUser(this.idUser).subscribe(()=>{
      alert('Usuario apagado com sucesso')
      environment.token=''
      environment.foto=''
      this.router.navigate(['/start'])
    })
  }
}
