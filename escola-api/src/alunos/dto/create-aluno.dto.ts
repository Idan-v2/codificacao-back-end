import { IsString, isNotEmpty, IsInt, Min, IsArray, ArrayMinSize, IsNotEmpty } from "class-validator";


export class CreateAlunoDto {
    @IsString()
    @IsNotEmpty({
        message:'O nome é obrigatório e não pode estar vazio!'
    })
    nome: string;

    @IsInt({
        message:'A idade deve ser um número inteiro!!'
    })
    idade: number;
    @IsString()
    @IsNotEmpty({
        message:'A matricula é Obrigatória!'
    })
    matricula: string;

    @IsString({each: true, message:'Cada curso deve ser um texto!'})
    @IsArray()
    @ArrayMinSize(1,{
        message:'O aluno deve estar matriculado em pelo menos 1 curso!'
    })
    cursos: string[];

}