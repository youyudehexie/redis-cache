var client = null;

/**
 * Cache prototype.
 */

var cache = exports = module.exports = {};

cache.init = function(){
    if(!client){
	client = require('redis').createClient()
	this.defaultConfig();
    }
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

var getCache = function(key, dep, callback){
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

exports.getCache = getCache;
