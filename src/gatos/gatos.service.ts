import { Injectable, NotFoundException } from '@nestjs/common';
import { Gato } from './entities/gatos.entity'
import { UpdateGatoDTO } from './dto/update-gato.dto';
import { CreateGatoDTO } from './dto/create-gato.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class GatosService {
    constructor(
        @InjectRepository(Gato)
        private readonly gatoRepository : Repository<Gato>,

        @InjectRepository(Tag)
        private readonly tagRepository : Repository<Tag>
    ) {}

    async findAll() {
        return this.gatoRepository.find({
            // exibe os campos que tem relação com outra tabela (senao nao aparece)
            relations: ['tags']
        })
    }

    async findOne(id: number) {
        const gato = await this.gatoRepository.findOne({
            where: { id: id }, // id atributo da entidade : id que vem do parametro
            relations: ['tags']
        })
        if (!gato) {
            //throw new HttpException(`ID ${id} não encontrado`, 404) // HttpStatus.NOT_FOUND
            throw new NotFoundException(`ID ${id} não encontrado`) // mais bonito
        }
    }

    async create(createGatoDTO: CreateGatoDTO) {
        const tags = await Promise.all(
            createGatoDTO.tags.map(name => this.preloadTagByName(name))
        )
        // criando a instancia (é apenas uma instancia, ainda não foi lançada no bd) é armazenando na constante 'gato'
        const gato = this.gatoRepository.create({
            ...createGatoDTO,
            tags,
        })
        // lançando a instancia no bd (Salvando)
        return this.gatoRepository.save(gato)
    }

    async update(id: number, updateGatoDTO: UpdateGatoDTO) {
        const tags =
        updateGatoDTO.tags &&
        (await Promise.all(
            updateGatoDTO.tags.map(name => this.preloadTagByName(name))
        ))
        // busca e cria instancia. Se algum campo do objeto não corresponder
        // ao da busca, não haverá nenhum retorno para constante 'gato'
        const gato = await this.gatoRepository.preload({
            ...updateGatoDTO,
            id: id,
            tags: tags,
        })
        if (!gato) {
            throw new NotFoundException(`Registro não encontrado`)
        }
        return this.gatoRepository.save(gato)
    }

    async remove(id: number){
        const gato = await this.gatoRepository.findOne({
            where: { id }
        })
        if (!gato) {
            throw new NotFoundException(`Registro não encontrado`)
        }
        return this.gatoRepository.remove(gato)
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne( {where: { name }})
        if (tag) {
            return tag
        }
        return this.tagRepository.create({ name })
    }
}
