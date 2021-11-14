export interface LoginDto {
    login: string;
    password: string;
}

export interface RegistrationDto {
    username: string;
    email: string;
    password: string;
}

export interface TokenDto {
    token: string;
}

export interface AvailableValidationResult {
    available: boolean;
}