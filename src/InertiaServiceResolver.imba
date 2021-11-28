import { Inertia } from './Inertia'
import { InertiaRedirect } from './InertiaRedirect'
import { InertiaResponse } from './InertiaResponse'
import { ServiceResolver } from '@formidablejs/framework'
import { ValidationException } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { FastifyReply } from '@formidablejs/framework'
import { isEmpty } from '@formidablejs/framework/lib/Support/Helpers'

export class InertiaServiceResolver < ServiceResolver

	def boot
		self.app.onResponse do(response\InertiaResponse|InertiaRedirect|ValidationException, request\Request, reply\FastifyReply)
			if !(response instanceof InertiaResponse || response instanceof InertiaRedirect || response instanceof ValidationException)
				return

			# transform validation exception.
			if response instanceof ValidationException
				# return if request was not initiated by Inertia.
				if !request.header('x-inertia') then return

				# pass validation errors to the session.
				request.request.session._errors = {
					errors: response.message.errors
				}

				# redirect back to the previous page.
				response = Inertia.redirect!

			if response instanceof InertiaRedirect then return response.handle(request, reply)

			const rootView = self.app.config.get('inertia.rootView')

			if isEmpty response._rootView then response.setRootView(rootView)

			response.handle(request, reply)
