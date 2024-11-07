import {SessionOptions} from "iron-session";

export interface SessionData {
    userId?: number;
    email?: string;
    name?: string;
    isLoggedIn: boolean;
    roles?: string[];
    token?: string;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: 'pyiurs-session',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
}