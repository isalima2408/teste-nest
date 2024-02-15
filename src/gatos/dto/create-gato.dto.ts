import { IsString } from "class-validator";
import { Tag } from "../entities/tag.entity";

export class CreateGatoDTO {
    @IsString()
    readonly name: string

    @IsString()    
    readonly raca: string

    // each aplica a regra a cada item do array
    @IsString({ each: true })
    readonly tags: string[]
}
