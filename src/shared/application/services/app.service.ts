import { Injectable } from '@nestjs/common';
import { env } from '@shared/env';

export interface AppServiceResponse {
  status: string;
  name: string;
  version: string;
}

@Injectable()
export class AppService {
  getStatus(): AppServiceResponse {
    return {
      status: 'SERVER_IS_READY',
      name: env.NAME,
      version: env.VERSION,
    };
  }
}
