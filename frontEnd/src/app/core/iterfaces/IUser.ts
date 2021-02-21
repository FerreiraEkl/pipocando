export interface IUser {
    id?: number;
    userLogin: string;
    userPassword: string;
    userAdultPassword?: string;
    userFirstName: string;
    userLastName?: string;
    userValid?: boolean;
    userMail: string;
    userProfile?: number;
}