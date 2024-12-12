import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserWithoutPassword } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) : Promise<User> {
    const hashed_password = await bcrypt.hash(createUserDto.password, 10);
    const new_user = this.userRepository.create({
      ...createUserDto,
      password:hashed_password
    })
    return this.userRepository.save(new_user)
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) : Promise<UserWithoutPassword> {
    const user = this.userRepository.findOne({where: {id} });
    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string) : Promise<User> {
    const user = this.userRepository.findOne({where: {username} });
    if(!user){
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<UserWithoutPassword> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) : Promise<void> {
    const user = await this.userRepository.findOne({where: {id} });
    await this.userRepository.remove(user);
  }
}
