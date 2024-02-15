import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"

@Entity('gato')
export class Gato {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    raca: string

    // entidade relacionada (alvo), inverso
    @JoinTable()
    // cascade - qualquer dado alterado aqui deve ser mandado pra tabela relacionada (criada nov tag)
    @ManyToMany(() => Tag, tag => tag.gato, {
        cascade: true
    })
    tags: Tag[]
}