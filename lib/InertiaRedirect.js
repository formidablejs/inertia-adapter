const $6 = Symbol.for('#__init__'), $7 = Symbol.for('#__patch__'), $14 = Symbol.for('#__initor__'), $15 = Symbol.for('#__inited__'), $8 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/framework'/*$path$*/);
var $2 = require('@formidablejs/framework'/*$path$*/);
var $3 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $4 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $5 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

class InertiaRedirect {
	[$7]($$ = {}){
		var $9;
		($9 = $$._props) !== undefined && (this._props = $9);
		
	}
	[$6]($$ = null){
		var $10;
		this._props = ($$ && ($10 = $$._props) !== undefined) ? ($10) : {};
		
	}
	/**
	@param {String} url
	*/
	constructor(url = null){
		this[$6]();
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
		var $11, $12;
		
		if ($3.isEmpty(this._props)) { return };
		
		const shared = (($11 = request.request.session._shared) != null) ? ($11) : {};
		
		return request.request.session._shared = {
			...shared,
			...(($12 = this._props) != null) ? ($12) : {}
		};
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	handle(request,reply){
		var $13;
		
		this.shareProps(request);
		
		const statusCode = ['PUT','PATCH','DELETE'].includes(request.method()) ? 303 : 302;
		
		return reply.redirect((($13 = this.url) != null) ? ($13) : request.header('referer')).code(statusCode);
	}
};
exports.InertiaRedirect = InertiaRedirect;
