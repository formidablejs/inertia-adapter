const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$frameworkφ2 = require('@formidablejs/framework'/*$path$*/);
var _$Helpersφ = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$Helpersφ2 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$Helpersφ3 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

class InertiaRedirect {
	[Ψ__init__]($$ = null){
		var vφ;
		this._props = ($$ && (vφ = $$._props) !== undefined) ? (vφ) : {};
		
	}
	/**
	@param {String} url
	*/
	constructor(url = null){
		this[Ψ__init__]();
		if (!(_$Helpersφ.isEmpty(url)) && !(_$Helpersφ2.isString(url))) { throw new TypeError("url must be a String.") };
		
		this.url = url;
	}
	
	/**
	@param {String} url
	*/
	static make(url = null){
		
		return new this(url);
	}
	
	/**
	@param {Object} props
	*/
	with(props = {}){
		
		if (!(_$Helpersφ3.isObject(props))) { throw new TypeError("props must be an Object.") };
		
		this._props = props;
		
		return this;
	}
	
	/**
	@param {Request} request
	*/
	shareProps(request){
		var φ, φ2;
		
		if (_$Helpersφ.isEmpty(this._props)) { return };
		
		const shared = ((φ = request.request.session._shared) != null) ? (φ) : {};
		
		return request.request.session._shared = {
			...shared,
			...((φ2 = this._props) != null) ? (φ2) : {}
		};
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	handle(request,reply){
		var φ3;
		
		this.shareProps(request);
		
		const statusCode = ['PUT','PATCH','DELETE'].includes(request.method()) ? 303 : 302;
		
		return reply.redirect(((φ3 = this.url) != null) ? (φ3) : request.header('referer')).code(statusCode);
	}
};
exports.InertiaRedirect = InertiaRedirect;
