import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public nomeTema: string
    public descricao: string
    public subtemaTema: string
    public postagem: Postagem[]

}