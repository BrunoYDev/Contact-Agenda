import { randomUUID } from "crypto"

export class Contact {
    readonly id: string
    fullname: string
    email: string
    cellphone: string
    registerDate: Date

    client_id?: string
    
    constructor(){
        this.id = randomUUID();
        this.registerDate = new Date();
    }
}
