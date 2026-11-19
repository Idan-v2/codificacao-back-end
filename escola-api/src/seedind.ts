import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { AlunosService } from "./alunos/alunos.service.js";
import { faker } from "@faker-js/faker/locale/pt_BR"
import { materialize } from "rxjs";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const alunosService = app.get(AlunosService);

    console.log('🎄Iniciando a geração de alunos Fakes...🎄');

    const cursosDisponiveis = [
        'Programador full-stack',
        'Panificação',
        'Eletricista Predial',
        'Excel básico',
        'Power BI Básico',
        'Apresentações Criativas no Canva',
        'Corte e Custura',
        'Tecnico em Biotecnologia',
        'Tecnicio em Informática',
        'Tecnico em jogos digitais',
        'tecnico em manutenção e suporte',
    ];
    for( let i = 0; i < 150; i++){
        const cursosAleatórios = faker.helpers.arrayElements(
            cursosDisponiveis,{min: 1, max: 3}
        )
        const alunoFaker = {
            nome: faker.person.fullName(),
            idade: faker.number.int({
                min:15,
                max: 65,
            }),
            matricula: faker.string.numeric(5),
            cursos: cursosAleatórios,
            ativo: true,
        };
        try{await alunosService.create(alunoFaker);}  catch(error){
        console.log(`Pular: Erro ao Criar Matricula para ${alunoFaker.nome}! - Matricula Duplicada`);
        }
    }
    console.log('✅ Banco de Dados populado com sucesso');
    console.log('Feliz Natal🎄');

    await app.close();
}
bootstrap();