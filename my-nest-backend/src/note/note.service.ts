import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly usersService: UsersService
  ) {}

  async create(createNoteDto: CreateNoteDto) : Promise<Note> {
    const owner  = await this.usersService.findOne(createNoteDto.ownerId)
    const newNote = this.noteRepository.create({
      ...createNoteDto,
      owner
    })

    return this.noteRepository.save(newNote);
  }

  findAll(userId?:number) : Promise<Note[]> {
    return userId ? this.noteRepository.find({where: {owner:{id:userId}}, order: {updatedAt:-1}}) : this.noteRepository.find({order: {updatedAt:-1}});
  }

  findOne(id: number) : Promise<Note> {
    return this.noteRepository.findOne({where:{id}})
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) : Promise<Note> {
    await this.noteRepository.update(id, updateNoteDto);
    return this.findOne(id);
  }

  async remove(id: number) : Promise<DeleteResult>{
    const note = await this.findOne(id);
    return await this.noteRepository.delete(note)
  }
}
