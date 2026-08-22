import { InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';


export class ApiKeyValidator {
  private static publicKey: string;

  private static getPublicKey(): string {
    if (!this.publicKey) {
      try {
        const keyPath = path.join(process.cwd(), 'keys', 'public.pem');
        this.publicKey = fs.readFileSync(keyPath, 'utf8');
      } catch (error) {
        throw new InternalServerErrorException('Public key is not loaded on the server.');
      }
    }
    return this.publicKey;
  }

  static verifyAndDecode(apiKey: string) {
    try {
      const parts = apiKey.split('.');
      if (parts.length !== 2) return null;

      const [encodedPayload, signature] = parts;
      const payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');

      const verify = crypto.createVerify('SHA256');
      verify.update(payload);
      verify.end();

      const isValid = verify.verify(this.getPublicKey(), signature, 'base64url');
      if (!isValid) return null;

      const [userId, allowedDomain, keyId] = payload.split('|');
      if (!userId || !allowedDomain || !keyId) return null;

      return { userId, allowedDomain, keyId };
    } catch {
      return null;
    }
  }
}
