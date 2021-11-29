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
    handle(request: Request, reply: FastifyReply): FastifyReply<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, any>;
    [Ψ__init__]($$?: any): void;
}
import { Request } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
declare const Ψ__init__: unique symbol;
export {};
