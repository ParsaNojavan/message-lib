import { ExecutionContext, CallHandler, ForbiddenException, HttpException } from "@nestjs/common";
import Aspect from "./abstract/aspect";
import Context from "@app/contracts/models/dtos/rpcContext";

export class RPCContextAspect extends Aspect {
    onBefore(context: ExecutionContext, next: CallHandler<any>): void {
        const data = context.switchToRpc().getData();

        data.context = data.context || {};

        next.handle()
    }
    onAfter(context: ExecutionContext, next: CallHandler<any>): void {
    }
    onException(error: any, context: ExecutionContext, next: CallHandler<any>): void {
    }
    onSuccess(context: ExecutionContext, next: CallHandler<any>): void {
    }

}