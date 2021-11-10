import { Postagem } from "./Postagem"
export class User{
    
    public id: number
    public nomeUsuario: string
    public emailUsuario: string
    public senhaUsuario: string
    public foto: string
    public tipo: string
    public postagem: Postagem[]


}