const $4 = Symbol.for('#__init__'), $5 = Symbol.for('#__patch__'), $8 = Symbol.for('#__initor__'), $9 = Symbol.for('#__inited__'), $6 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/framework'/*$path$*/);
var $2 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $3 = require('@formidablejs/framework'/*$path$*/);

class InertiaMiddleware {
	[$5]($$ = {}){
		var $7;
		($7 = $$.request) !== undefined && (this.request = $7);
		
	}
	constructor($$ = null){
		this[$4]($$);
	}
	[$4]($$ = null){
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
