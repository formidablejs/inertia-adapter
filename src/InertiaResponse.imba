import { FastifyReply } from '@formidablejs/framework'
import { isEmpty } from '@formidablejs/framework/lib/Support/Helpers'
import { isObject } from '@formidablejs/framework/lib/Support/Helpers'
import { isString } from '@formidablejs/framework/lib/Support/Helpers'
import { isNumber } from '@formidablejs/framework/lib/Support/Helpers'
import { Request } from '@formidablejs/framework'
import { version } from './Support/Helpers'
import { view } from '@formidablejs/framework/lib/Support/Helpers'
import { View } from '@formidablejs/framework'

export class InertiaResponse

	prop _component\String
	prop _props\Object = {}
	prop _viewData\Object = {}
	prop _rootView\View
	prop _statusCode\Number = 200
	prop _headers\Object = {}

	def constructor component\String, props\Object = {}
		if !isString component then throw new TypeError "component must be a String."

		if !isEmpty(props) && !isObject(props) then throw new TypeError "props must be an Object."

		self._component = component
		self._props = props

	static def make component\String, props\Object = {}
		new self(component, props)

	def setRootView view\View
		if !(view instanceof View) then throw new TypeError "view must be a valid View class."

		self._rootView = view

		self

	def withViewData viewData\Object = {}
		if !isObject(viewData) then throw new TypeError "viewData must be an Object."

		self._viewData = viewData

		self

	def with props\Object = {}
		if !isObject(props) then throw new TypeError "props must be an Object."

		self._props = props

		self

	def setStatusCode statusCode\Number
		if !isNumber(statusCode) then throw new TypeError "statusCode must be a number."

		self._statusCode = statusCode

		self

	def headers headers\Object = {}
		if !isObject(headers) then throw new TypeError "headers must be an Object."

		self._headers = headers

		self

	def resolveSharedProps request\Request
		if !request.request.session._shared then return {}

		const shared = request.request.session._shared

		delete request.request.session._shared

		return shared

	def resolveValidationErrors request\Request
		if !request.request.session._errors then return {}

		const errors = request.request.session._errors

		delete request.request.session._errors

		return errors

	def handle request\Request, reply\FastifyReply, propKeys, patialKeys
		if request.isMethod('GET') && request.hasHeader('x-inertia') && request.header('x-inertia-version') !== version!
			return reply
				.status(400)
				.header('X-Inertia-Location', request.url!)
				.sent = true

		const props = {
			...self.resolveSharedProps(request)
			...self.resolveValidationErrors(request)
		}

		if request.hasHeader('x-inertia-partial-data') && request.header('-inertia-partial-component') === self._component
			patialKeys = request.header('x-inertia-partial-data').split(',')
		else
			propKeys = Object.keys(self._props)

		const page = {
			version: version!
			component: self._component
			props: props
			url: request.url!
		}

		for own key, value of propKeys || patialKeys
			if typeof self._props[value] == 'function'
				if propKeys && self._props[value].isLazy then continue

				page.props[value] = await self._props[value]!
			else
				page.props[value] = self._props[value]

		if request.hasHeader('x-inertia')
			return reply
				.headers({
					...self._headers
					'Content-Type': 'application/json'
					'X-Inertia': 'true'
					'Vary': 'Accept'
				})
				.status(self._statusCode)
				.send(JSON.stringify(page))
				.sent = true

		const encodedPageString = JSON.stringify(page).replace(/'/g, '&quot;').replace(/'/g, '&#039;')

		return view(self._rootView, Object.assign(self._viewData, { dataPage: encodedPageString }))
			.toView(reply)
