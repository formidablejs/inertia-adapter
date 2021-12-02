const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$frameworkφ = require('@formidablejs/framework'/*$path$*/);
var _$Helpersφ = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$Helpersφ2 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$Helpersφ3 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$Helpersφ4 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$frameworkφ2 = require('@formidablejs/framework'/*$path$*/);
var _$Helpersφ5 = require('./Support/Helpers'/*$path$*/);
var _$Helpersφ6 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
class InertiaResponse {
	[Ψ__init__]($$ = null){
		var vφ;
		this._component = $$ ? $$._component : undefined;
		this._props = ($$ && (vφ = $$._props) !== undefined) ? (vφ) : {};
		this._viewData = ($$ && (vφ = $$._viewData) !== undefined) ? (vφ) : {};
		this._rootView = $$ ? $$._rootView : undefined;
		this._statusCode = ($$ && (vφ = $$._statusCode) !== undefined) ? (vφ) : 200;
		this._headers = ($$ && (vφ = $$._headers) !== undefined) ? (vφ) : {};
		
	}
	/**
	@param {String} component
	@param {Object} props
	*/
	constructor(component,props = {}){
		this[Ψ__init__]();
		if (!(_$Helpersφ3.isString(component))) { throw new TypeError("component must be a String.") };
		
		if (!(_$Helpersφ.isEmpty(props)) && !(_$Helpersφ2.isObject(props))) { throw new TypeError("props must be an Object.") };
		
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
		
		if (!(_$Helpersφ2.isObject(viewData))) { throw new TypeError("data must be an Object.") };
		
		this._viewData = viewData;
		
		return this;
	}
	
	/**
	@param {Object} props
	*/
	with(props = {}){
		
		if (!(_$Helpersφ2.isObject(props))) { throw new TypeError("props must be an Object.") };
		
		this._props = props;
		
		return this;
	}
	
	/**
	@param {Number} statusCode
	*/
	setStatusCode(statusCode){
		
		if (!(_$Helpersφ4.isNumber(statusCode))) { throw new TypeError("statusCode must be a number.") };
		
		this._statusCode = statusCode;
		
		return this;
	}
	
	/**
	@param {Object} headers
	*/
	headers(headers = {}){
		
		if (!(_$Helpersφ2.isObject(headers))) { throw new TypeError("headers must be an Object.") };
		
		this._headers = headers;
		
		return this;
	}
	
	/**
	@param {Request} request
	*/
	resolveSharedProps(request){
		var φ;
		
		if (!request.request.session._shared) { return {} };
		
		const shared = request.request.session._shared;
		
		(((φ = request.request.session._shared),delete request.request.session._shared, φ));
		
		return shared;
	}
	
	/**
	@param {Request} request
	*/
	resolveValidationErrors(request){
		var φ2;
		
		if (!request.request.session._errors) { return {} };
		
		const errors = request.request.session._errors;
		
		(((φ2 = request.request.session._errors),delete request.request.session._errors, φ2));
		
		return errors;
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	async handle(request,reply,propKeys,patialKeys){
		
		if (request.isMethod('GET') && request.hasHeader('x-inertia') && request.header('x-inertia-version') !== _$Helpersφ5.version()) {
			
			return reply.status(400).header('X-Inertia-Location',request.url()).sent = true;
		};
		
		const props = {
			...this.resolveSharedProps(request),
			...this.resolveValidationErrors(request)
		};
		
		if (request.hasHeader('x-inertia-partial-data') && request.header('-inertia-partial-component') === this._component) {
			
			patialKeys = request.header('x-inertia-partial-data').split(',');
		} else {
			
			propKeys = Object.keys(this._props);
		};
		
		const page = {
			version: _$Helpersφ5.version(),
			component: this._component,
			props: props,
			url: request.url()
		};
		
		for (let oφ = propKeys || patialKeys, iφ = 0, keysφ = Object.keys(oφ), lφ = keysφ.length, key, value; iφ < lφ; iφ++){
			key = keysφ[iφ];value = oφ[key];
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
		
		return _$Helpersφ6.view(this._rootView,Object.assign(this._viewData,{dataPage: encodedPageString})).toView(reply);
	}
};
exports.InertiaResponse = InertiaResponse;
