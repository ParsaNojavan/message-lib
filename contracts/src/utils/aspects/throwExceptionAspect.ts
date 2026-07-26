import { ExecutionContext, CallHandler, ForbiddenException, HttpException } from "@nestjs/common";
import Aspect from "./abstract/aspect";

export class ThrowExceptionAspcet extends Aspect {
    onBefore(context: ExecutionContext, next: CallHandler<any>): void {
    }
    onAfter(context: ExecutionContext, next: CallHandler<any>): void {
    }
    onException(error: any, context: ExecutionContext, next: CallHandler<any>): void {
        throw new HttpException(error.error, error.error.statusCode)
    }
    onSuccess(context: ExecutionContext, next: CallHandler<any>): void {
    }

}