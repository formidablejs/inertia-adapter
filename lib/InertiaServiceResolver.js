Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Inertia'/*$path$*/);
var $2 = require('./InertiaRedirect'/*$path$*/);
var $3 = require('./InertiaResponse'/*$path$*/);
var $4 = require('@formidablejs/framework'/*$path$*/);
var $5 = require('@formidablejs/framework'/*$path$*/);
var $6 = require('@formidablejs/framework'/*$path$*/);
var $7 = require('@formidablejs/framework'/*$path$*/);
var $8 = require('@formidablejs/framework'/*$path$*/);
var $9 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

class InertiaServiceResolver extends $4.ServiceResolver {
	
	
	boot(){
		var self = this;
		
		return self.app.onResponse(function(/**@type {InertiaResponse|InertiaRedirect|ValidationException}*/response,/**@type {Request}*/request,/**@type {FastifyReply}*/reply) {
			
			if (!(((response instanceof $3.InertiaResponse) || (response instanceof $2.InertiaRedirect) || (response instanceof $5.ValidationException)))) {
				
				return;
			};
			
			// transform validation exception.
			if (response instanceof $5.ValidationException) {
				
				// return if request was not initiated by Inertia.
				if (!(request.header('x-inertia'))) { return };
				
				// pass validation errors to the session.
				request.request.session._errors = {
					errors: response.message.errors
				};
				
				// redirect back to the previous page.
				response = $1.Inertia.redirect();
			};
			
			if (response instanceof $2.InertiaRedirect) { return response.handle(request,reply) };
			
			const rootView = self.app.config.get('inertia.rootView');
			
			if ($9.isEmpty(response._rootView)) { response.setRootView(rootView) };
			
			return response.handle(request,reply);
		});
	}
};
exports.InertiaServiceResolver = InertiaServiceResolver;
