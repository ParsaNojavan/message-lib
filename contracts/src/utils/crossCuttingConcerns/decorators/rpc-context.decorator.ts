import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RPCContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const d = ctx.switchToRpc().getData();
    return d.context;
  },
);