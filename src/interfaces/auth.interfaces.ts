import { Request } from "express";

/* export interface AuthInfo{
    uid: string
}

export interface AuthInfoRequest extends Request {
    uid: AuthInfo
} */

export interface JwtPayload {
    uid: string
}

