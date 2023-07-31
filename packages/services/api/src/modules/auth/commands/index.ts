import { LoginController } from './login/login.controller';
import { LoginCommandHandler } from './login/login.handler';
import { LogoutController } from './logout/logout.controller';
import { RefreshController } from './refresh/refresh.controller';
import { RefreshCommandHandler } from './refresh/refresh.handler';

export const commandHandlers = [LoginCommandHandler, RefreshCommandHandler];
export const commandControllers = [
  LoginController,
  RefreshController,
  LogoutController,
];
