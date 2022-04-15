Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $2 = require('crypto'/*$path$*/);
var $3 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var $4 = require('fs'/*$path$*/);
var $5 = require('path'/*$path$*/);
var $6 = require('fs'/*$path$*/);
function version(){
	
	const manifest = $5.join(process.cwd(),'public','mix-manifest.json');
	
	if (!($4.existsSync(manifest))) { return $3.encrypt($1.config('app.url')) };
	
	const buffer = $6.readFileSync(manifest);
	const hashSum = $2.createHash('sha256');
	
	hashSum.update(buffer);
	
	return hashSum.digest('hex');
};
exports.version = version;
