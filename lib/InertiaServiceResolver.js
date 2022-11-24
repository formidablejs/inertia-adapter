Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('child_process'/*$path$*/);
var $2 = require('./Inertia'/*$path$*/);
var $3 = require('./InertiaRedirect'/*$path$*/);
var $4 = require('./InertiaResponse'/*$path$*/);
var $5 = require('@formidablejs/framework'/*$path$*/);
var $6 = require('@formidablejs/framework'/*$path$*/);
var $7 = require('@formidablejs/framework'/*$path$*/);
var $8 = require('@formidablejs/framework'/*$path$*/);
var $9 = require('@formidablejs/framework'/*$path$*/);
var $10 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

const state = {
	running: false
};

class InertiaServiceResolver extends $5.ServiceResolver {
	
	
	boot(){
		
		this.enableInertia();
		
		if (this.app.config.get('inertia.mix')) {
			
			return this.enableMix(this.app.config.get('inertia.mix'));
		};
	}
	
	enableInertia(){
		var self = this;
		
		return self.app.onResponse(function(/**@type {InertiaResponse|InertiaRedirect|ValidationException}*/response,/**@type {Request}*/request,/**@type {FastifyReply}*/reply) {
			
			if (!(((response instanceof $4.InertiaResponse) || (response instanceof $3.InertiaRedirect) || (response instanceof $6.ValidationException)))) {
				
				return;
			};
			
			// transform validation exception.
			if (response instanceof $6.ValidationException) {
				
				// return if request was not initiated by Inertia.
				if (!(request.header('x-inertia'))) { return };
				
				// pass validation errors to the session.
				request.request.session._errors = {
					errors: response.message.errors
				};
				
				// redirect back to the previous page.
				response = $2.Inertia.redirect();
			};
			
			if (response instanceof $3.InertiaRedirect) { return response.handle(request,reply) };
			
			const rootView = self.app.config.get('inertia.rootView');
			
			if ($10.isEmpty(response._rootView)) { response.setRootView(rootView) };
			
			return response.handle(request,reply);
		});
	}
	
	/**
	@param {string} script
	*/
	enableMix(script){
		
		return this.app.addHook('onReady',function() {
			
			if (!state.running && process.env.IMBA_CLUSTER == '') {
				
				return;
			};
			
			state.running = true;
			
			const mix = $1.exec(script,{
				cwd: process.cwd(),
				stdio: 'pipe'
			});
			
			mix.stdout.on('data',function(data) {
				
				const line = data.toString();
				
				if (line.startsWith('✔ Mix: Compiled with some errors')) {
					
					state.follow = true;
					return process.stderr.write(line);
				} else if (state.follow && !(line.startsWith('✔ Mix: Compiled with some errors'))) {
					
					state.follow = false;
					return process.stderr.write(line);
				} else if (line.startsWith('WARNING in ')) {
					
					return process.stderr.write(line);
				} else if (line.startsWith('✔ Mix: Compiled successfully')) {
					
					return process.stdout.write(line);
				};
			});
			
			mix.stderr.on('data',function(data) {
				
				return process.stderr.write(data.toString());
			});
			
			process.on('SIGINT',function() {
				
				return mix.kill('SIGINT');
			});
			
			return process.on('SIGTERM',function() {
				
				return mix.kill('SIGTERM');
			});
		});
	}
};
exports.InertiaServiceResolver = InertiaServiceResolver;
