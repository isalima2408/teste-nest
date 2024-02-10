import { IsString } from "class-validator";

export class CreateGatoDTO {
    @IsString()
    readonly nome: string

    @IsString()    
    readonly raca: string

    // each aplica a regra a cada item do array
    @IsString({ each: true })
    readonly tags: string[]
}
