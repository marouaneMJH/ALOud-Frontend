// Auth Request/Response DTOs from API
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface VerifyEmailRequestDto {
  email: string;
  code: string;
}

export interface ResendVerificationRequestDto {
  email: string;
}

// User DTO from API response
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified?: boolean;
}

// Login response from API (with token)
export interface LoginResponseDto {
  message: string;
  user: UserDto;
  token: string;
}

// Register response from API
export interface RegisterResponseDto {
  message: string;
  email: string;
}
