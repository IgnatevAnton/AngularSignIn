export interface IRegistrationUser {
  registration(login: string, password: string, email: string): void;
}
