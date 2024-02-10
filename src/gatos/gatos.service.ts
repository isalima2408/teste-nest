import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Gato } from './gatos.entity'
import { UpdateGatoDTO } from './dto/update-gato.dto';
import { CreateGatoDTO } from './dto/create-gato.dto';

@Injectable()
export class GatosService {
    private gatos: Gato[] = [
        {
            id: 1,
            nome: 'Guida',
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

    create(createGatoDTO: CreateGatoDTO) {
        this.gatos.push(createGatoDTO as Gato)
    }

    update(id: number, updateGatoDTO: UpdateGatoDTO) {
        const index = this.gatos.findIndex(gato => gato.id === id);
        if (index !== -1) {
            this.gatos[index] = {
                id,
                ...(updateGatoDTO as Gato),
            };
        } else {
            throw new Error(`Gato com o ID ${id} não encontrado.`);
        }
    }

    remove(id: number){
        const index = this.gatos.findIndex(gato => gato.id === id)
        if(index >= 0) {
            this.gatos.splice(index, 1)
        }
    }
}
