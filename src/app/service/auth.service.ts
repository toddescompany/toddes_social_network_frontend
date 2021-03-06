import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  constructor(private http: HttpClient ) { }

  entrar(userLogin: UserLogin) : Observable <UserLogin>{
    return this.http.post<UserLogin>('https://toddes.herokuapp.com/usuarios/logar', userLogin)
  }
  cadastrar(user: User): Observable <User>{
    return this.http.post<User>('https://toddes.herokuapp.com/usuarios/cadastrar', user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://toddes.herokuapp.com/usuarios/${id}`)
  }

  deleteUser(id: number){
    return this.http.delete(`https://toddes.herokuapp.com/usuarios/${id}`, this.token)
  }

  getByUserUser(emailUsuario:string): Observable<User[]>{
    return this.http.get<User[]>('https://toddes.herokuapp.com/usuarios/all')
  }

  logado (){
    let ok :boolean = false
    if (environment.token != '')
      ok = true

    return ok
  }
}
