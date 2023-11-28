import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Client } from './entities/client.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const findClient = await this.prisma.client.findFirst({
      where: { email: createClientDto.email },
    });

    if (findClient) {
      throw new ConflictException('Client already registered.');
    }

    const client = new Client();
    Object.assign(client, { ...createClientDto });

    await this.prisma.client.create({
      data: { ...client },
    });

    return plainToInstance(Client, client);
  }

  async findAll() {
    const findUsers = await this.prisma.client.findMany();
    return plainToInstance(Client, findUsers);
  }

  async findByEmail(email: string) {
    const findClient = await this.prisma.client.findFirst({
      where: { email },
    });

    return findClient;
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException('Client not found.');
    }
    return plainToInstance(Client, client);
  }

  async update(id: string, updateClientDto: UpdateClientDto, loggedId: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if(id !== loggedId){
      throw new UnauthorizedException('Only the account owner can update.')
    }
    if (!client) {
      throw new NotFoundException('Client not found.');
    }
    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: { ...updateClientDto },
    });
    return plainToInstance(Client, updatedClient);
  }

  async remove(id: string, loggedId: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if(id !== loggedId){
      throw new UnauthorizedException('Only the account owner can delete.')
    }
    if (!client) {
      throw new NotFoundException('Client not found.');
    }
    await this.prisma.client.delete({
      where: { id },
    });
  }
}
