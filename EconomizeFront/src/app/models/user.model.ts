export class UserModel {
    id!: number;
    name!: string;
    lastname!: string;
    useremail!: string;
    password!: string;
    token_access!: string;
    token_refresh!: string;
}

export class requestResetModel {
    useremail!: string;
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
