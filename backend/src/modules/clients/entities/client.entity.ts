import { randomUUID } from 'crypto';
import { Exclude } from 'class-transformer';

export class Client {
  readonly id: string;
  fullname: string;
  email: string;
  cellphone: string;
  registerDate: Date;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.registerDate = new Date();
  }
}
