const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$Helpersφ = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$frameworkφ2 = require('@formidablejs/framework'/*$path$*/);

class InertiaMiddleware {
	constructor($$ = null){
		this[Ψ__init__]($$);
	}
	[Ψ__init__]($$ = null){
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
		
		if (!(_$Helpersφ.isObject)) { throw TypeError('Expected object.') };
		
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
