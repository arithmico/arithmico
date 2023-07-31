import { SetMetadata } from '@nestjs/common';

export const SecurityAttributes = (...attributes: string[]) =>
  SetMetadata('securityAttributes', new Set(attributes));
