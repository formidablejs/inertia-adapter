import { FastifyReply } from '@formidablejs/framework'
import { isObject } from '@formidablejs/framework/lib/Support/Helpers'
import { Request } from '@formidablejs/framework'

export class InertiaMiddleware

	prop request\Request

	def handle request\Request, reply\FastifyReply, params\any|any[]
		self.request = request

		const shared = await self.share!

		if !isObject then throw TypeError 'Expected object.'

		request.request.session._shared = shared

	def shared
		request.request.session._shared

	def share
		{}
