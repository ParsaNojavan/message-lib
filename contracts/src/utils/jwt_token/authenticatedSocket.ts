import { Socket } from 'socket.io';

export interface JwtPayload {
  sub: string;
  username?: string;
  email?: string;
  claims?: string[];
  iat?: number;
  exp?: number;
}


export interface AuthenticatedSocket extends Socket {
  data: {
    user: JwtPayload;
    at?: number;
  };
}
