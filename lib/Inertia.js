Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./InertiaRedirect'/*$path$*/);
var $2 = require('./InertiaResponse'/*$path$*/);
var $3 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);

class Inertia {
	
	
	/**
	@param {String} component
	@param {Object} props
	*/
	static render(component,props = {}){
		
		return $2.InertiaResponse.make(component,props);
	}
	
	/**
	@param {String} url
	*/
	static redirect(url = null){
		
		return $1.InertiaRedirect.make(url);
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
		
		if (!($3.isFunction(fn))) { throw new TypeError("callback must be a function.") };
		
		fn.isLazy = true;
		
		return fn;
	}
};
exports.Inertia = Inertia;
