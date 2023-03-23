import { exec } from 'child_process'
import { Inertia } from './Inertia'
import { InertiaRedirect } from './InertiaRedirect'
import { InertiaResponse } from './InertiaResponse'
import { ServiceResolver } from '@formidablejs/framework'
import { ValidationException } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { FastifyReply } from '@formidablejs/framework'
import { Output } from '@formidablejs/console'
import { isEmpty } from '@formidablejs/framework/lib/Support/Helpers'

const state = {
	follow: false,
	running: false
}

export class InertiaServiceResolver < ServiceResolver

	def boot\void
		self.enableInertia!

		if self.app.config.get('inertia.mix')
			self.enableMix self.app.config.get('inertia.mix')

	def enableInertia\void
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

	def enableMix\void script\string
		self.app.onServeInjection do(options)
			# ignore if server is not in development mode.
			if !options.dev then return

			Output.write(options.noAnsi ? '   INFO  Compiling assets…\n' : '  <bg:blue> INFO </bg:blue> Compiling assets…\n')

			# start laravel mix.
			const mix = exec(script, {
				cwd: process.cwd(),
				stdio: 'pipe',
			})

			# print output.
			mix.stdout.on 'data', do(data)
				const line = data.toString()

				if line.startsWith('✔ Mix: Compiled with some errors')
					state.follow = true
					process.stderr.write(line)
				elif state.follow && !line.startsWith('✔ Mix: Compiled with some errors')
					state.follow = false
					process.stderr.write(line)
				elif line.startsWith('WARNING in ')
					process.stderr.write(options.noAnsi ? line : "\x1b[33m{line}\x1b[0m")
				elif line.startsWith('✔ Mix: Compiled successfully')
					process.stdout.write(options.noAnsi ? line : "\x1b[32m{line}\x1b[0m")

			# print error output.
			mix.stderr.on 'data', do(data)
				process.stderr.write(data.toString())

			# kill laravel mix on SIGINT.
			process.on 'SIGINT', do
				mix.kill 'SIGINT'

			# kill laravel mix on SIGTERM.
			process.on 'SIGTERM', do
				mix.kill 'SIGTERM'
