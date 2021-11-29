Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Inertiaφ = require('./Inertia'/*$path$*/);
var _$InertiaRedirectφ = require('./InertiaRedirect'/*$path$*/);
var _$InertiaResponseφ = require('./InertiaResponse'/*$path$*/);
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$frameworkφ2 = require('@formidablejs/framework'/*$path$*/);
var _$frameworkφ3 = require('@formidablejs/framework'/*$path$*/);
var _$frameworkφ4 = require('@formidablejs/framework'/*$path$*/);
var _$frameworkφ5 = require('@formidablejs/framework'/*$path$*/);
var _$Helpersφ = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

class InertiaServiceResolver extends _$frameworkφ.ServiceResolver {
	
	
	boot(){
		var self = this;
		
		return self.app.onResponse(function(/**@type {InertiaResponse|InertiaRedirect|ValidationException}*/response,/**@type {Request}*/request,/**@type {FastifyReply}*/reply) {
			
			if (!(((response instanceof _$InertiaResponseφ.InertiaResponse) || (response instanceof _$InertiaRedirectφ.InertiaRedirect) || (response instanceof _$frameworkφ2.ValidationException)))) {
				
				return;
			};
			
			// transform validation exception.
			if (response instanceof _$frameworkφ2.ValidationException) {
				
				// return if request was not initiated by Inertia.
				if (!(request.header('x-inertia'))) { return };
				
				// pass validation errors to the session.
				request.request.session._errors = {
					errors: response.message.errors
				};
				
				// redirect back to the previous page.
				response = _$Inertiaφ.Inertia.redirect();
			};
			
			if (response instanceof _$InertiaRedirectφ.InertiaRedirect) { return response.handle(request,reply) };
			
			const rootView = self.app.config.get('inertia.rootView');
			
			if (_$Helpersφ.isEmpty(response._rootView)) { response.setRootView(rootView) };
			
			return response.handle(request,reply);
		});
	}
};
exports.InertiaServiceResolver = InertiaServiceResolver;
