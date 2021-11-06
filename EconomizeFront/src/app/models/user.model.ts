export class UserModel {
    id!: number;
    name!: string;
    useremail!: string;
    password!: string;
}

export class UserLogin {
    id!: number;
    useremail!: string;
    password!: string;
    tokens!: string;
}