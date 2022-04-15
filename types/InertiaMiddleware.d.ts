export class InertiaMiddleware {
    constructor($$?: any);
    request: any;
    /**
    @param {Request} request
    @param {FastifyReply} reply
    @param {any|any[]} params
    */
    handle(request: Request, reply: FastifyReply, params: any | any[]): Promise<{}>;
    shared(): any;
    share(): {};
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
import { Request } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
