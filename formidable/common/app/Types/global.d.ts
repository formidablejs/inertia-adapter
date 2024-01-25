import type { Axios } from "axios";
import type { LoDashStatic } from "lodash";

export {};

declare global {
    interface Window {
        _: LoDashStatic,
		axios: Axios
    }
}
