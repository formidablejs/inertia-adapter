export class InertiaServiceResolver extends ServiceResolver {
    /**
    @returns { void }
    */
    boot(): void;
    /**
    @returns { void }
    */
    enableInertia(): void;
    /**
    @param {string} script
    @returns { void }
    */
    enableMix(script: string): void;
}
import { ServiceResolver } from "@formidablejs/framework";
