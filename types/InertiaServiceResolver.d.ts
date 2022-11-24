export class InertiaServiceResolver extends ServiceResolver {
    boot(): import("@formidablejs/framework").Application;
    enableInertia(): import("@formidablejs/framework").Application;
    /**
    @param {string} script
    */
    enableMix(script: string): import("@formidablejs/framework").Application;
}
import { ServiceResolver } from "@formidablejs/framework";
