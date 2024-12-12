import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { UsersModule } from 'src/users/users.module';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Note]), UsersModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
