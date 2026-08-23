import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ApiKeyValidator } from '../validator/api-key.validator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException('API Key is missing');
    }

    const decoded = ApiKeyValidator.verifyAndDecode(apiKey);
    if (!decoded) {
      throw new UnauthorizedException('Invalid or forged API Key');
    }

    const requestOrigin = request.headers['origin'] || request.headers['referer'];
    if (!requestOrigin) {
      throw new UnauthorizedException('Origin header is required for widgets');
    }

    try {
      const originUrl = new URL(requestOrigin);
      if (originUrl.hostname !== decoded.allowedDomain) {
        throw new UnauthorizedException('Domain is not authorized');
      }
    } catch (e) {
      throw new UnauthorizedException('Invalid Origin format');
    }

    return true;
  }
}
