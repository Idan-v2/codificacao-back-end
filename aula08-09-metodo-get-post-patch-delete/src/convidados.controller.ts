import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateConvidadoDto } from './dto/create-convidado.dto.js';

@Controller('convidados')
export class ConvidadosController {

  @Get()
  listarTodos() {
    return ['Jorry', 'Katherine', 'Gabriel'];
  }

  @Post()
  criar(@Body() createConvidadoDto: CreateConvidadoDto) {

    console.log(
      `[PORTEIRO DIGITAL] Novo convidado recebido: ${createConvidadoDto.nome}`
    );

    return {
      mensagem: `Convidado ${createConvidadoDto.nome} adicionado com sucesso!`,
      dados: createConvidadoDto,
    };
  }
}