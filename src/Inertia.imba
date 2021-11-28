import { InertiaRedirect } from './InertiaRedirect'
import { InertiaResponse } from './InertiaResponse'
import { isFunction } from '@formidablejs/framework/lib/Support/Helpers'

export class Inertia

	static def render component\String, props\Object = {}
		InertiaResponse.make(component, props)

	static def redirect url\String = null
		InertiaRedirect.make(url)

	static def back
		self.redirect!

	static def share props\Object = {}
		self.redirect!.with(props)

	static def lazy fn\Function
		if !isFunction(fn) then throw new TypeError "callback must be a function."

		fn.isLazy = true

		fn
