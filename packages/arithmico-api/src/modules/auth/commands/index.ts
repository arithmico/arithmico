import { LoginController } from './login/login.controller';
import { LoginCommandHandler } from './login/login.handler';

export const commandHandlers = [LoginCommandHandler];
export const commandControllers = [LoginController];
