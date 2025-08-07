
export interface User {
    authStrategy: string;
    createdAT: string;
    email: string;
    id: number;
    lastname: string;
    username: string;
}

export type UserNameAndLastName = Pick<User, 'username' | 'lastname'>;