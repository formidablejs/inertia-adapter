const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/framework'/*$path$*/);
var $2 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $3 = require('@formidablejs/framework'/*$path$*/);

class InertiaMiddleware {
	[$__patch__$]($$ = {}){
		var $4;
		($4 = $$.request) !== undefined && (this.request = $4);
		
	}
	constructor($$ = null){
		this[$__init__$]($$);
	}
	[$__init__$]($$ = null,deep = true){
		this.request = $$ ? $$.request : undefined;
		
	}
	/**
	@param {Request} request
	@param {FastifyReply} reply
	@param {any|any[]} params
	*/
	async handle(request,reply,params){
		
		this.request = request;
		
		const shared = await this.share();
		
		if (!($2.isObject)) { throw TypeError('Expected object.') };
		
		return request.request.session._shared = shared;
	}
	
	shared(){
		
		return this.request.request.session._shared;
	}
	
	share(){
		
		return {};
	}
};
exports.InertiaMiddleware = InertiaMiddleware;
