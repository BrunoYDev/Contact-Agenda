import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto, clientId: string) {
    const contact = new Contact();
    Object.assign(contact, {
      ...createContactDto,
    });

    await this.prisma.contact.create({
      data: {
        id: contact.id,
        fullname: contact.fullname,
        email: contact.email,
        cellphone: contact.cellphone,
        clientId,
      },
    });
    return contact;
  }

  async findAll(clientId: string) {
    const findContacts = await this.prisma.contact.findMany({
      where: { clientId },
    });
    return findContacts;
  }

  async findOne(id: string, clientId: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id, clientId },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found.');
    }
    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
    clientId: string,
  ) {
    const contact = await this.prisma.contact.findUnique({
      where: { id, clientId },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found.');
    }
    const updatedContact = await this.prisma.contact.update({
      where: { id, clientId },
      data: { ...updateContactDto },
    });
    return updatedContact;
  }

  async remove(id: string, clientId: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id, clientId },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found.');
    }
    await this.prisma.contact.delete({
      where: { id, clientId },
    });
  }
}
