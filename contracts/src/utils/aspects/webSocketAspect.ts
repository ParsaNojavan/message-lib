import { ExecutionContext, CallHandler } from "@nestjs/common";
import Aspect from "./abstract/aspect";
import Context from "@app/contracts/models/dtos/rpcContext";

export class WsContextAspect extends Aspect {
    onBefore(context: ExecutionContext, next: CallHandler<any>): void {
        const client = context.switchToWs().getClient();
        const data = context.switchToWs().getData();

        const tokenPayload: any =
            client.user ||
            client.data?.user ||
            {};

        client.context = {
            sub: tokenPayload.sub || null,
            exp: tokenPayload.exp || null,
            iat: tokenPayload.iat || null,
            chatId: tokenPayload.chatId || data?.chatId || null,
            lang: tokenPayload.lang || null,
            claims: tokenPayload.claims || null,
            ip: client.handshake?.address || null,
            socketId: client.id || null,
        } as Context;
    }

    onAfter(context: ExecutionContext, next: CallHandler<any>): void {}

    onException(error: any, context: ExecutionContext, next: CallHandler<any>): void {}

    onSuccess(context: ExecutionContext, next: CallHandler<any>): void {}
}
