import { InertiaRedirect } from './InertiaRedirect'
import { InertiaResponse } from './InertiaResponse'
import { isEmpty } from '@formidablejs/framework/lib/Support/Helpers'
import { isObject } from '@formidablejs/framework/lib/Support/Helpers'
import { isString } from '@formidablejs/framework/lib/Support/Helpers'
import { isFunction } from '@formidablejs/framework/lib/Support/Helpers'

export class Inertia

	static def render component\String, props\Object = {}
		if !isString component
			throw new TypeError "component must be a String."

		if !isEmpty(props) && !isObject(props)
			throw new TypeError "props must be an Object."

		InertiaResponse.make(component, props)

	static def redirect url\String = null
		if !isEmpty(url) && !isString(url)
			throw new TypeError "url must be a String."

		InertiaRedirect.make(url)

	static def back
		self.redirect!

	static def share props\Object = {}
		if !isObject(props)
			throw new TypeError "props must be an Object."

		self.redirect!.with(props)

	static def lazy fn\Function
		if !isFunction(fn)
			throw new TypeError "callback must be a function."

		fn.isLazy = true

		fn
