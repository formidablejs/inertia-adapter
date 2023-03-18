import { Inertia } from "./Inertia";
import { InertiaMiddleware } from "./InertiaMiddleware";
import { InertiaRedirect } from "./InertiaRedirect";
import { InertiaResponse } from "./InertiaResponse";
import { InertiaServiceResolver } from "./InertiaServiceResolver";
import { version } from "./Support/Helpers";
import type { LoDashStatic } from 'lodash';
import type { Axios } from 'axios';

declare global {
    interface Window {
        _: LoDashStatic,
		axios: Axios
    }
}

export { Inertia, InertiaMiddleware, InertiaRedirect, InertiaResponse, InertiaServiceResolver, version };
