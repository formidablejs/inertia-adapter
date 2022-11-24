import { exec } from 'child_process'
import { Inertia } from './Inertia'
import { InertiaRedirect } from './InertiaRedirect'
import { InertiaResponse } from './InertiaResponse'
import { ServiceResolver } from '@formidablejs/framework'
import { ValidationException } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { FastifyReply } from '@formidablejs/framework'
import { isEmpty } from '@formidablejs/framework/lib/Support/Helpers'

const state = {
	running: false
}

export class InertiaServiceResolver < ServiceResolver

	def boot
		self.enableInertia!

		if self.app.config.get('inertia.mix')
			self.enableMix self.app.config.get('inertia.mix')

	def enableInertia
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

	def enableMix script\string
		self.app.addHook 'onReady', do
			if !state.running && process.env.IMBA_CLUSTER == ''
				return

			state.running = true

			const mix = exec(script, {
				cwd: process.cwd(),
				stdio: 'pipe',
			})

			mix.stdout.on 'data', do(data)
				const line = data.toString()

				if line.startsWith('✔ Mix: Compiled with some errors')
					state.follow = true
					process.stderr.write(line)

				elif state.follow && !line.startsWith('✔ Mix: Compiled with some errors')
					state.follow = false
					process.stderr.write(line)

				elif line.startsWith('WARNING in ')
					process.stderr.write(line)

				elif line.startsWith('✔ Mix: Compiled successfully')
					process.stdout.write(line)

			mix.stderr.on 'data', do(data)
				process.stderr.write(data.toString())

			process.on 'SIGINT', do
				mix.kill 'SIGINT'

			process.on 'SIGTERM', do
				mix.kill 'SIGTERM'
