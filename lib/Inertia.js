Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$InertiaRedirectφ = require('./InertiaRedirect'/*$path$*/);
var _$InertiaResponseφ = require('./InertiaResponse'/*$path$*/);
var _$Helpersφ = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

class Inertia {
	
	
	/**
	@param {String} component
	@param {Object} props
	*/
	static render(component,props = {}){
		
		return _$InertiaResponseφ.InertiaResponse.make(component,props);
	}
	
	/**
	@param {String} url
	*/
	static redirect(url = null){
		
		return _$InertiaRedirectφ.InertiaRedirect.make(url);
	}
	
	static back(){
		
		return this.redirect();
	}
	
	/**
	@param {Object} props
	*/
	static share(props = {}){
		
		return this.redirect().with(props);
	}
	
	/**
	@param {Function} fn
	*/
	static lazy(fn){
		
		if (!(_$Helpersφ.isFunction(fn))) { throw new TypeError("callback must be a function.") };
		
		fn.isLazy = true;
		
		return fn;
	}
};
exports.Inertia = Inertia;
