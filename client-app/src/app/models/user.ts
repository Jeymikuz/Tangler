export interface User{
    username: string;
    displayName: string;
    token: string;
}

export interface UserLoginFormValues{
    username: string;
    password: string;
}

export interface NewUser{
    userName: string;
    displayName: string;
    password: string;
}

export interface UserSettings{
    id: string;
    userName: string;
    displayName: string;
}