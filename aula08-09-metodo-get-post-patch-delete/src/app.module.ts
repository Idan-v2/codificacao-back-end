import { Module } from '@nestjs/common';
import { ConvidadosController } from './convidados.controller.js';

@Module({
  imports: [],
  controllers: [ConvidadosController],
  providers: [],
})
export class AppModule {}