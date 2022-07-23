const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/framework'/*$path$*/);
var $2 = require('@formidablejs/framework'/*$path$*/);
var $3 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $4 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $5 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

class InertiaRedirect {
	[$__patch__$]($$ = {}){
		var $6;
		($6 = $$._props) !== undefined && (this._props = $6);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $7;
		this._props = ($$ && ($7 = $$._props) !== undefined) ? ($7) : {};
		
	}
	/**
	@param {String} url
	*/
	constructor(url = null){
		this[$__init__$]();
		if (!($3.isEmpty(url)) && !($4.isString(url))) { throw new TypeError("url must be a String.") };
		
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
		
		if (!($5.isObject(props))) { throw new TypeError("props must be an Object.") };
		
		this._props = props;
		
		return this;
	}
	
	/**
	@param {Request} request
	*/
	shareProps(request){
		var $8, $9;
		
		if ($3.isEmpty(this._props)) { return };
		
		const shared = (($8 = request.request.session._shared) != null) ? ($8) : {};
		
		return request.request.session._shared = {
			...shared,
			...(($9 = this._props) != null) ? ($9) : {}
		};
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	handle(request,reply){
		var $10;
		
		this.shareProps(request);
		
		const statusCode = ['PUT','PATCH','DELETE'].includes(request.method()) ? 303 : 302;
		
		return reply.redirect((($10 = this.url) != null) ? ($10) : request.header('referer')).code(statusCode);
	}
};
exports.InertiaRedirect = InertiaRedirect;
