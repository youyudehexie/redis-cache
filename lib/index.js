var client = null;
var async = require('async');

/**
 * Cache prototype.
 */

var cache = exports = module.exports = {};

cache.init = function(){
    if(!client){
	client = require('redis').createClient()
	this.defaultConfig();
    }
    return client;
};

cache.defaultConfig = function(){
    this.expire = 60*60;
};

cache.getKey = function(key, callback){
  client.get(key, callback);
};

cache.setKey = function(key, val, callback){
    var expire = this.expire;

    client.setex(key, expire, val, function(err){
        callback(err, val);
    });
};

cache.getCache = function(key, dep, callback){
    cache.getKey(key, function(err, replies){
        if(err) return callback(err);

        if(!replies) {
            dep.call(null, function(err, val){
                if(err) return callback(err);
                cache.setKey(key, val, callback);
            });
        } else {
            return callback(err, replies);
        }
    });
};

cache.recoverCache = function(key, method, dep, callback){
    client.keys(key, function(err, keys){
        if(err) return callback(err);

	async.map(keys, function(key, callback){
	    client[method](key, callback);
	},function(err, datas){
	    if(err) return callback(err);
	    dep.call(null, datas, function(err, val){
		if(err) return callback(err);
                async.forEach(keys, function(key, callback){
                    client.del(key, callback);
                },callback);
            });
	});
    });
};

cache.setManyCache = function(method, args, callback){
    async.forEach(args, function(arg, callback){
	client[method](arg, callback);	
    },callback);
}

cache.getManyCache = function(method, args, callback){
    async.map(args, function(arg, callback){
        client[method](arg, callback);
    },callback);
}
