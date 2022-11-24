import { App } from '../resources/views/app';

export default {

	/**
	 * --------------------------------------------------------------------------
	 * Root View
	 * --------------------------------------------------------------------------
	 *
	 * Sets the root template that's loaded on the first page visit.
	 */

	rootView: App,

	/**
	 * --------------------------------------------------------------------------
	 * Laravel Mix Command
	 * --------------------------------------------------------------------------
	 * Command that runs to execute Laravel Mix when Formidable is in development
	 * mode.
	 */

	mix: "npm run mix:watch"

}
