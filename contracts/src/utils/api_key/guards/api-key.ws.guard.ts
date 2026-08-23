import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ApiKeyValidator } from '../validator/api-key.validator';

@Injectable()
export class WsApiKeyGuard implements CanActivate {
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const handshake = client.handshake;

    const apiKey = 
      handshake.auth?.apiKey || 
      handshake.query?.apiKey || 
      handshake.headers['x-api-key'];

    if (!apiKey) {
      throw new WsException('API Key is missing');
    }

    const decoded = ApiKeyValidator.verifyAndDecode(apiKey as string);
    if (!decoded) {
      throw new WsException('Invalid or forged API Key');
    }

    const requestOrigin = handshake.headers['origin'] || handshake.headers['referer'];
    if (!requestOrigin) {
      throw new WsException('Origin header is required for widgets');
    }

    try {
      const originUrl = new URL(requestOrigin);
      if (originUrl.hostname !== decoded.allowedDomain) {
        throw new WsException('Domain is not authorized');
      }
    } catch (e) {
      throw new WsException('Invalid Origin format');
    }

    return true;
  }
}
