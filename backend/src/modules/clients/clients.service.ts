import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Client } from './entities/client.entity';
import { plainToInstance } from 'class-transformer';
import fs from 'node:fs';
const PDFDocument = require('pdfkit-table');

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
    if (id !== loggedId) {
      throw new UnauthorizedException('Only the account owner can update.');
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

  async makePdfReport(id: string): Promise<Buffer> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException('Client not found.');
    }
    const clientContacts = await this.prisma.contact.findMany({
      where: { clientId: id },
    });
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'B4',
        bufferPages: true,
      });

      const newClientContacts = [];
      for (let i = 0; i < clientContacts.length; i++) {
        const newContactRegisterDate =
          clientContacts[i].registerDate.toISOString();
        const newContact = {
          ...clientContacts[i],
          registerDate: newContactRegisterDate,
        };
        newClientContacts.push(newContact);
      }

      const pdfText = `Contatos do usuário ${client.fullname}`;
      const contacts = {
        title: pdfText,
        valign: 'center',
        headers: [
          {
            label: 'Nome completo do contato',
            property: 'fullname',
            width: 160,
            align: 'center',
            valign: 'center',
          },
          {
            label: 'Email',
            property: 'email',
            width: 140,
            align: 'center',
            valign: 'center',
            headerVAlign: "center",
          },
          {
            label: 'Numero de telefone',
            property: 'cellphone',
            width: 130,
            align: 'center',
            valign: 'center',
          },
          {
            label: 'Data de registro',
            property: 'registerDate',
            width: 150,
            align: 'center',
            valign: 'center',
          },
        ],
        datas: newClientContacts,
      };
      const clientInfo = {
        valign: 'center',
        headers: [
          {
            label: 'Email',
            property: 'email',
            width: 215,
            align: 'center',
            valign: 'center',
          },
          {
            label: 'Numero de telefone',
            property: 'cellphone',
            width: 200,
            align: 'center',
            valign: 'center',
          },
          {
            label: 'Data de registro',
            property: 'registerDate',
            width: 145,
            align: 'center',
            valign: 'center',
          },
        ],
        datas: [
          {
            email: client.email,
            cellphone: client.cellphone,
            registerDate: client.registerDate.toISOString(),
          },
        ],
      };

      doc.fontSize(24);
      doc.fillColor('black').text(`Dados do usuário ${client.fullname}`, {
        align: 'center',
        stroke: 20,
      });
      doc.moveDown(1);
      doc.table(clientInfo, {
        minRowHeight: 40,
        padding: 10,
        align: 'center',
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font('Helvetica').fontSize(16).fillColor('black');
          const { x, y, width, height } = rectCell;
          if (indexColumn === 0) {
            doc
              .lineWidth(0.5)
              .moveTo(x, y)
              .lineTo(x, y + height)
              .stroke();
          }

          doc
            .lineWidth(0.5)
            .moveTo(x + width, y)
            .lineTo(x + width, y + height)
            .stroke();
          indexColumn === 0 && doc.addBackground(rectRow, 'green', 0.15);
        },
      });
      doc.moveDown(2);
      doc.table(contacts, {
        minRowHeight: 40,
        padding: 10,
        align: 'center',
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(14),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font('Helvetica').fontSize(12);

          const { x, y, width, height } = rectCell;
          if (indexColumn === 0) {
            doc
              .lineWidth(0.5)
              .moveTo(x, y)
              .lineTo(x, y + height)
              .stroke();
          }

          doc
            .lineWidth(0.5)
            .moveTo(x + width, y)
            .lineTo(x + width, y + height)
            .stroke();
          indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
        },
      });

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });
    return pdfBuffer;
  }

  async remove(id: string, loggedId: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (id !== loggedId) {
      throw new UnauthorizedException('Only the account owner can delete.');
    }
    if (!client) {
      throw new NotFoundException('Client not found.');
    }
    await this.prisma.client.delete({
      where: { id },
    });
  }
}
