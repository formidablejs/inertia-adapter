const $12 = Symbol.for('#__init__'), $13 = Symbol.for('#__patch__'), $25 = Symbol.for('#__initor__'), $26 = Symbol.for('#__inited__'), $14 = Symbol.for('#__hooks__');
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
	[$13]($$ = {}){
		var $15;
		($15 = $$._component) !== undefined && (this._component = $15);
		($15 = $$._props) !== undefined && (this._props = $15);
		($15 = $$._viewData) !== undefined && (this._viewData = $15);
		($15 = $$._rootView) !== undefined && (this._rootView = $15);
		($15 = $$._statusCode) !== undefined && (this._statusCode = $15);
		($15 = $$._headers) !== undefined && (this._headers = $15);
		
	}
	[$12]($$ = null){
		var $16;
		this._component = $$ ? $$._component : undefined;
		this._props = ($$ && ($16 = $$._props) !== undefined) ? ($16) : {};
		this._viewData = ($$ && ($16 = $$._viewData) !== undefined) ? ($16) : {};
		this._rootView = $$ ? $$._rootView : undefined;
		this._statusCode = ($$ && ($16 = $$._statusCode) !== undefined) ? ($16) : 200;
		this._headers = ($$ && ($16 = $$._headers) !== undefined) ? ($16) : {};
		
	}
	/**
	@param {String} component
	@param {Object} props
	*/
	constructor(component,props = {}){
		this[$12]();
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
		var $17;
		
		if (!request.request.session._shared) { return {} };
		
		const shared = request.request.session._shared;
		
		((($17 = request.request.session._shared),delete request.request.session._shared, $17));
		
		return shared;
	}
	
	/**
	@param {Request} request
	*/
	resolveValidationErrors(request){
		var $18;
		
		if (!request.request.session._errors) { return {errors: {}} };
		
		const errors = request.request.session._errors;
		
		((($18 = request.request.session._errors),delete request.request.session._errors, $18));
		
		return errors;
	}
	
	/**
	@param {Request} request
	*/
	resolveRootViewProps(request){
		var $19, $20;
		
		const rootViewProps = {
			locale: request.locale(),
			flash: $11.without((($19 = request.req.session._flashed) != null) ? ($19) : {},['_old'])
		};
		
		((($20 = request.req.session._flashed),delete request.req.session._flashed, $20));
		
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
		
		for (let $23 = propKeys || patialKeys, $21 = 0, $22 = Object.keys($23), $24 = $22.length, key, value; $21 < $24; $21++){
			key = $22[$21];value = $23[key];
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
