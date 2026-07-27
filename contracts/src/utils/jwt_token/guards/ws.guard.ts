import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Reflector } from '@nestjs/core';
import { AuthenticatedSocket } from '../authenticatedSocket';

@Injectable()
export class WsJwtGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector, 
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: AuthenticatedSocket = context.switchToWs().getClient();
    const token = this.extractToken(client);

    if (!token) {
      throw new WsException('Missing authentication token');
    }

    try {

      const payload = await this.jwtService.verifyAsync(token);

      const requiredClaims = this.reflector.getAllAndOverride<string[]>('claims', [
        context.getHandler(),
        context.getClass(),
      ]);

      if (requiredClaims && requiredClaims.length > 0) {

        const hasClaim = requiredClaims.some(x => payload.claims?.includes(x));
        
        if (!hasClaim) {
          throw new WsException('Forbidden: You do not have the required permissions');
        }
      }

      client.data.user = payload;
      
      return true;
    } catch (error) {
  
      if (error instanceof WsException) throw error;
      
      throw new WsException('Invalid or expired token');
    }
  }

  private extractToken(client: AuthenticatedSocket): string | null {
    const tokenFromAuth = client.handshake?.auth?.token;
    if (tokenFromAuth) return this.cleanToken(tokenFromAuth);

    const tokenFromHeader = client.handshake?.headers?.authorization;
    if (tokenFromHeader) return this.cleanToken(tokenFromHeader);

    const tokenFromQuery = client.handshake?.query?.token;
    if (typeof tokenFromQuery === 'string') return this.cleanToken(tokenFromQuery);

    return null;
  }

  private cleanToken(token: string): string {
    return token.startsWith('Bearer ') ? token.split(' ')[1] : token;
  }
}
