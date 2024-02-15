import { Controller, Get, Param, Body, Post, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { CreateGatoDTO } from './dto/create-gato.dto';
import { UpdateGatoDTO } from './dto/update-gato.dto';

@Controller('/gatos')
export class GatosController {
    constructor(private readonly gatosService: GatosService) {}


    @Get()
    findAll() {
        return this.gatosService.findAll();
    }

    // nao ta prestando
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.gatosService.findOne(id);
    }

    @Post()
    create(@Body() createGatoDTO: CreateGatoDTO) {
        return this.gatosService.create(createGatoDTO);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateGatoDTO: UpdateGatoDTO) {
        console.log("🚀 ~ GatosController ~ update ~ id:", id)
        return this.gatosService.update(id, updateGatoDTO);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.gatosService.remove(id);
    }
}
