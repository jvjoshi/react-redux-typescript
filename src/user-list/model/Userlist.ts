export interface IUserlist {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    admin: boolean;
    nonAdmin: boolean;
    favorites: boolean;
    archieved: boolean;
    lastLogin: Date;
}

export interface ISelectedUser {
    label: string;
    value: string;
    iconClass?: string;
    id?: number;
}