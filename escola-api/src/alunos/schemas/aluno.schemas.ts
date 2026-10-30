import { Prop, 
        Schema, 
        SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AlunoDoc = HydratedDocument<Aluno>

@Schema()
export class Aluno {

    @Prop({
        required:true
    })
    nome:string;
    
    @Prop({
        required:true
    })
    idade:string;
        
    @Prop({
        required:true,
        unique:true
    })
    matricula:string;

    @Prop([String])
    cursos:string[];
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);