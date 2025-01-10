export type LoginFormState = {
    username: string;
    password: string;
    remember: boolean;
}

export type LoginResponse = {
    token: string;
}
