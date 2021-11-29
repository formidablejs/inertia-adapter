Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Helpersφ = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$cryptoφ = require('crypto'/*$path$*/);
var _$Helpersφ2 = require('@formidablejs/framework/lib/Support/Helpers'/*$path$*/);
var _$fsφ = require('fs'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$fsφ2 = require('fs'/*$path$*/);
function version(){
	
	const manifest = _$pathφ.join(process.cwd(),'public','mix-manifest.json');
	
	if (!(_$fsφ.existsSync(manifest))) { return _$Helpersφ2.encrypt(_$Helpersφ.config('app.url')) };
	
	const buffer = _$fsφ2.readFileSync(manifest);
	const hashSum = _$cryptoφ.createHash('sha256');
	
	hashSum.update(buffer);
	
	return hashSum.digest('hex');
};
exports.version = version;
