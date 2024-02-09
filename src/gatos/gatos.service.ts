import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Gato } from './gatos.entity'

@Injectable()
export class GatosService {
    private gatos: Gato[] = [
        {
            id: 1,
            name: 'Guida',
            raca: 'Siamês',
            tags: ['fêmea', 'doméstico'],
        },
    ]

    findAll() {
        return this.gatos
    }

    findOne(id: number) {
        const gato = this.gatos.find(gato => gato.id === id)
        if (!gato) {
            //throw new HttpException(`ID ${id} não encontrado`, 404) // HttpStatus.NOT_FOUND
            throw new NotFoundException(`ID ${id} não encontrado`) // mais bonito
        }
    }

    // oq sig DTO??
    create(createGatoDTO: any) {
        this.gatos.push(createGatoDTO)
    }

    // 'as any' inserido só para 'passar' pela verificação, porque foi alterado o método findOne que é usado aqui
    update(id: number, updateGatoDTO: any) {
        const existingGato = this.findOne(id)
        if(existingGato as any) {
            const index = this.gatos.findIndex(gato => gato.id === id)
            this.gatos[index] = {
                id,
                ...updateGatoDTO,
            }
        }
    }

    remove(id: number){
        const index = this.gatos.findIndex(gato => gato.id === id)
        if(index >= 0) {
            this.gatos.splice(index, 1)
        }
    }
}
