import { JwtService } from "@nestjs/jwt";

export function buildContext(token: string, jwt: JwtService, ip?: string) {
    const tokenPayload = jwt.decode(token)

    return {
        sub: tokenPayload?.sub || null,
        exp: tokenPayload?.exp || null,
        iat: tokenPayload?.iat || null,
        chatId: tokenPayload?.chatId,
        lang: tokenPayload?.lang,
        claims: tokenPayload?.claims,
        ip: ip,
    }
}
