const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $2 = require('@formidablejs/framework'/*$path$*/);
var $3 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $4 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $5 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $6 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $7 = require('@formidablejs/framework'/*$path$*/);
var $8 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $9 = require('./Support/Helpers'/*$path$*/);
var $10 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $11 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
class InertiaResponse {
	[$__patch__$]($$ = {}){
		var $12;
		($12 = $$._component) !== undefined && (this._component = $12);
		($12 = $$._props) !== undefined && (this._props = $12);
		($12 = $$._viewData) !== undefined && (this._viewData = $12);
		($12 = $$._rootView) !== undefined && (this._rootView = $12);
		($12 = $$._statusCode) !== undefined && (this._statusCode = $12);
		($12 = $$._headers) !== undefined && (this._headers = $12);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $13;
		this._component = $$ ? $$._component : undefined;
		this._props = ($$ && ($13 = $$._props) !== undefined) ? ($13) : {};
		this._viewData = ($$ && ($13 = $$._viewData) !== undefined) ? ($13) : {};
		this._rootView = $$ ? $$._rootView : undefined;
		this._statusCode = ($$ && ($13 = $$._statusCode) !== undefined) ? ($13) : 200;
		this._headers = ($$ && ($13 = $$._headers) !== undefined) ? ($13) : {};
		
	}
	/**
	@param {String} component
	@param {Object} props
	*/
	constructor(component,props = {}){
		this[$__init__$]();
		if (!($6.isString(component))) { throw new TypeError("component must be a String.") };
		
		if (!($3.isEmpty(props)) && !($5.isObject(props))) { throw new TypeError("props must be an Object.") };
		
		this._component = component;
		this._props = props;
	}
	
	/**
	@param {String} component
	@param {Object} props
	*/
	static make(component,props = {}){
		
		return new this(component,props);
	}
	
	/**
	@param {View} view
	*/
	setRootView(view){
		
		this._rootView = view;
		
		return this;
	}
	
	/**
	@param {Object} viewData
	*/
	withViewData(viewData = {}){
		
		if (!($5.isObject(viewData))) { throw new TypeError("data must be an Object.") };
		
		this._viewData = viewData;
		
		return this;
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
	@param {Number} statusCode
	*/
	setStatusCode(statusCode){
		
		if (!($4.isNumber(statusCode))) { throw new TypeError("statusCode must be a number.") };
		
		this._statusCode = statusCode;
		
		return this;
	}
	
	/**
	@param {Object} headers
	*/
	headers(headers = {}){
		
		if (!($5.isObject(headers))) { throw new TypeError("headers must be an Object.") };
		
		this._headers = headers;
		
		return this;
	}
	
	/**
	@param {Request} request
	*/
	resolveSharedProps(request){
		var $14;
		
		if (!request.request.session._shared) { return {} };
		
		const shared = request.request.session._shared;
		
		((($14 = request.request.session._shared),delete request.request.session._shared, $14));
		
		return shared;
	}
	
	/**
	@param {Request} request
	*/
	resolveValidationErrors(request){
		var $15;
		
		if (!request.request.session._errors) { return {errors: {}} };
		
		const errors = request.request.session._errors;
		
		((($15 = request.request.session._errors),delete request.request.session._errors, $15));
		
		return errors;
	}
	
	/**
	@param {Request} request
	*/
	resolveRootViewProps(request){
		var $16, $17;
		
		const rootViewProps = {
			locale: request.locale(),
			flash: $11.without((($16 = request.req.session._flashed) != null) ? ($16) : {},['_old'])
		};
		
		((($17 = request.req.session._flashed),delete request.req.session._flashed, $17));
		
		return rootViewProps;
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	async handle(request,reply,propKeys,patialKeys){
		
		if (request.isMethod('GET') && request.hasHeader('x-inertia') && request.header('x-inertia-version') !== $9.version()) {
			
			request.req.session._shared = {};
			request.req.session._flashed = {};
			request.req.session._errors = {};
			
			return reply.status(400).header('X-Inertia-Location',request.url()).sent = true;
		};
		
		const props = {
			...this.resolveSharedProps(request),
			...this.resolveValidationErrors(request),
			...this.resolveRootViewProps(request)
		};
		
		if (request.hasHeader('x-inertia-partial-data') && request.header('-inertia-partial-component') === this._component) {
			
			patialKeys = request.header('x-inertia-partial-data').split(',');
		} else {
			
			propKeys = Object.keys(this._props);
		};
		
		const page = {
			version: $9.version(),
			component: this._component,
			props: props,
			url: request.url()
		};
		
		for (let $20 = propKeys || patialKeys, $18 = 0, $19 = Object.keys($20), $21 = $19.length, key, value; $18 < $21; $18++){
			key = $19[$18];value = $20[key];
			if (typeof this._props[value] == 'function') {
				
				if (propKeys && this._props[value].isLazy) {
					continue;
				};
				
				page.props[value] = await this._props[value]();
			} else {
				
				page.props[value] = this._props[value];
			};
		};
		
		if (request.hasHeader('x-inertia')) {
			
			return reply.headers({
				...this._headers,
				'Content-Type': 'application/json',
				'X-Inertia': 'true',
				Vary: 'Accept'
			}).status(this._statusCode).send(JSON.stringify(page)).sent = true;
		};
		
		const encodedPageString = JSON.stringify(page).replace(/'/g,'&quot;').replace(/'/g,'&#039;');
		
		return $10.view(this._rootView,Object.assign(this._viewData,{dataPage: encodedPageString})).toView(request,reply);
	}
};
exports.InertiaResponse = InertiaResponse;
