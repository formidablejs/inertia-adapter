import { InertiaRedirect } from './InertiaRedirect'
import { InertiaResponse } from './InertiaResponse'

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
		fn.isLazy = true

		fn
