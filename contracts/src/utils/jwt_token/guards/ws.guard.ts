import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Reflector } from '@nestjs/core'; // اضافه شد
import { AuthenticatedSocket } from '../authenticatedSocket';

@Injectable()
export class WsJwtGuard implements CanActivate {
  // Reflector را برای خواندن دکوریتورها تزریق می‌کنیم
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
      // ۱. تایید اعتبار توکن
      const payload = await this.jwtService.verifyAsync(token);

      // ۲. خواندن Claimهای مورد نیاز از متد (Handler) یا کلاس (Class)
      // فرض می‌کنیم کلید متادیتا 'claims' است
      const requiredClaims = this.reflector.getAllAndOverride<string[]>('claims', [
        context.getHandler(),
        context.getClass(),
      ]);

      // ۳. بررسی Claimها (دقیقاً با منطق Strategy خودت)
      if (requiredClaims && requiredClaims.length > 0) {
        // منطق: حداقل یکی از claimهای درخواستی باید در توکن کاربر باشد (OR logic)
        const hasClaim = requiredClaims.some(x => payload.claims?.includes(x));
        
        if (!hasClaim) {
          throw new WsException('Forbidden: You do not have the required permissions');
        }
      }

      // ۴. چسباندن اطلاعات به کلاینت
      client.data.user = payload;
      
      return true;
    } catch (error) {
      // اگر خطا از جنس WsException بود (مثل Forbidden)، همان را پرتاب کن
      if (error instanceof WsException) throw error;
      
      // در غیر این صورت، خطای توکن نامعتبر
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
