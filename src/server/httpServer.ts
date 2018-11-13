import { RequestHandler } from 'restify';

export interface IHttpServer {
    get(url: string, requestHandler: RequestHandler, authenticate?: boolean): void;
    post(url: string, requestHandler: RequestHandler, authenticate?: boolean): void;
    put(url: string, requestHandler: RequestHandler, authenticate?: boolean): void;
    del(url: string, requestHandler: RequestHandler, authenticate?: boolean): void;
}