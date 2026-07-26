import { ExecutionContext, CallHandler, ForbiddenException, HttpException } from "@nestjs/common";
import Aspect from "./abstract/aspect";
import Context from "@app/contracts/models/dtos/rpcContext";

export class HttpContextAspcet extends Aspect {
    onBefore(context: ExecutionContext, next: CallHandler<any>): void {
        const req = context.switchToHttp().getRequest();

        let tokenPayload: any = req.user || {};

        req.context = {
            sub: tokenPayload.sub || null,
            exp: tokenPayload.exp || null,
            iat: tokenPayload.iat || null,
            chatId: tokenPayload.chatId,
            lang: tokenPayload.lang,
            claims: tokenPayload.claims,
            ip: req.ip || req.connection.remoteAddress,
        } as Context;

        next.handle()
    }
    onAfter(context: ExecutionContext, next: CallHandler<any>): void {
    }
    onException(error: any, context: ExecutionContext, next: CallHandler<any>): void {
    }
    onSuccess(context: ExecutionContext, next: CallHandler<any>): void {
    }

}