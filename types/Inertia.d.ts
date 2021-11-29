export class Inertia {
    /**
    @param {String} component
    @param {Object} props
    */
    static render(component: string, props?: any): InertiaResponse;
    /**
    @param {String} url
    */
    static redirect(url?: string): InertiaRedirect;
    static back(): InertiaRedirect;
    /**
    @param {Object} props
    */
    static share(props?: any): InertiaRedirect;
    /**
    @param {Function} fn
    */
    static lazy(fn: Function): Function;
}
import { InertiaResponse } from "./InertiaResponse";
import { InertiaRedirect } from "./InertiaRedirect";
