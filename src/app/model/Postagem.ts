import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem{
    public id_postagem: number
    public tituloPostagem: string
    public texto_postagem: string
    public date: Date
    public anonimo_postagem: boolean
    public fk_tema: Tema
    public fk_usuario: User
}