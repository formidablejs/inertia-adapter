import { FastifyReply } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { isEmpty } from '@formidablejs/framework/lib/Support/Helpers'

export class InertiaRedirect

	prop _props\Object = {}

	def constructor url\String = null
		self.url = url

	static def make url\String = null
		new self(url)

	def with _props\Object = {}
		self._props = _props

		self

	def shareProps request\Request
		if isEmpty(self._props) then return

		const shared = request.request.session._shared ?? {}

		request.request.session._shared = {
			...shared
			...self._props ?? {}
		}

	def handle request\Request, reply\FastifyReply
		self.shareProps(request)

		const statusCode = ['PUT', 'PATCH', 'DELETE'].includes(request.method!) ? 303 : 302

		reply
			.redirect(self.url ?? request.header('referer'))
			.code(statusCode)
