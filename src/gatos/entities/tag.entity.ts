import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Gato } from "./gatos.entity"

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Gato, gato => gato.tags)
    gato: Gato[]
}