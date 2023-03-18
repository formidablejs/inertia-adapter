/// <reference types="node" />
export class InertiaRedirect {
    /**
    @param {String} url
    */
    static make(url?: string): InertiaRedirect;
    /**
    @param {String} url
    */
    constructor(url?: string);
    _props: any;
    url: string;
    /**
    @param {Object} props
    */
    with(props?: any): InertiaRedirect;
    /**
    @param {Request} request
    */
    shareProps(request: Request): any;
    /**
    @param {Request} request
    @param {FastifyReply} reply
    */
    handle(request: Request, reply: FastifyReply): FastifyReply<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify/types/route").RouteGenericInterface, any>;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import { Request } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
