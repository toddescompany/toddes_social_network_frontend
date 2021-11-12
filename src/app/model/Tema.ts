import { Postagem } from "./Postagem"

export class Tema{
    public idTema: number
    public nomeTema: string
    public descricao: string
    public subtemaTema: string
    public postagem: Postagem[]

}