import { I18nResolver } from 'nestjs-i18n';
import { ExecutionContext } from '@nestjs/common';

export class RpcLangResolver implements I18nResolver {
  resolve(context: ExecutionContext): string | string[] | undefined {
    if (context.getType() === 'rpc') {
      const payload = context.switchToRpc().getData();
      return payload?.context?.lang ?? 'en';
    }
    return undefined;
  }
}
