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
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import { Request } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
