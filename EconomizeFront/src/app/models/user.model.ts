export class UserModel {
    id!: number;
    name!: string;
    lastname!: string;
    useremail!: string;
    password!: string;
    tokens!: string;
}

export class passwordModel {
    old_password!: string;
    new_password!: string;
}