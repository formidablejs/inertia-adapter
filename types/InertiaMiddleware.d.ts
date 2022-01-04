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
    [Ψ__init__]($$?: any): void;
}
import { Request } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
declare const Ψ__init__: unique symbol;
export {};
