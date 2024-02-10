import { IsString, IsInt } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateGatoDTO } from "./create-gato.dto";

// restringe tipo das variáveis para serem recebidas (instalar mapped types)
export class UpdateGatoDTO extends PartialType(CreateGatoDTO) {
    @IsInt()
    readonly id?: number

    @IsString()
    readonly nome?: string

    @IsString()
    readonly raca?: string

    @IsString({ each: true })
    readonly tags?: string[]
}
