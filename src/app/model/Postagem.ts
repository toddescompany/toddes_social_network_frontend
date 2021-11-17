import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem{
    public id_postagem: number
    public tituloPostagem: string
    public texto_postagem: string
    public data_postagem: Date
    public anonimo_postagem: boolean
    public fk_tema: Tema
    public fk_usuario: User
    public imagem: string

}