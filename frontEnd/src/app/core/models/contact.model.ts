import { IContact } from '../iterfaces/IContact';
export class Contact implements IContact {

    id?: number;
    contactName: string;
    contactPhone: string;
    contactMail: string;
    contactMessage: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
