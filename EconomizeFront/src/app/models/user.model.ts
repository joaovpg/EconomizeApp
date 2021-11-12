export class UserModel {
    id!: number;
    name!: string;
    lastname!: string;
    useremail!: string;
    password!: string;
    tokens!: string;
}

export class PasswordModel {
    old_password!: string;
    new_password!: string;
}

export class ErrorDetail {
    useremail!: string;
    password!: string;
    detail!: string;
    old_password!: string;
    new_password!: string;
}