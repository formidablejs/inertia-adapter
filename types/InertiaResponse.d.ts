export class InertiaResponse {
    /**
    @param {String} component
    @param {Object} props
    */
    static make(component: string, props?: any): InertiaResponse;
    /**
    @param {String} component
    @param {Object} props
    */
    constructor(component: string, props?: any);
    _component: string;
    _props: any;
    _viewData: any;
    _rootView: any;
    _statusCode: any;
    _headers: any;
    /**
    @param {View} view
    */
    setRootView(view: View): InertiaResponse;
    /**
    @param {Object} viewData
    */
    withViewData(viewData?: any): InertiaResponse;
    /**
    @param {Object} props
    */
    with(props?: any): InertiaResponse;
    /**
    @param {Number} statusCode
    */
    setStatusCode(statusCode: number): InertiaResponse;
    /**
    @param {Object} headers
    */
    headers(headers?: any): InertiaResponse;
    /**
    @param {Request} request
    */
    resolveSharedProps(request: Request): any;
    /**
    @param {Request} request
    */
    resolveValidationErrors(request: Request): any;
    /**
    @param {Request} request
    */
    resolveRootViewProps(request: Request): {
        locale: any;
        flash: any;
    };
    /**
    @param {Request} request
    @param {FastifyReply} reply
    */
    handle(request: Request, reply: FastifyReply, propKeys: any, patialKeys: any): Promise<any>;
    [Ψ__init__]($$?: any): void;
}
import { Request } from "@formidablejs/framework";
import { FastifyReply } from "@formidablejs/framework";
declare const Ψ__init__: unique symbol;
export {};
