var redis = require('redis');
var client = redis.createClient();

/**
 * Cache prototype.
 */

var cache = exports = module.exports = {};

cache.init = function(){
    this.defaultConfig()
};

cache.defaultConfig = function(){
    this.expire = 6*60*60;
}

cache.getKey = function(key, callback){
  client.get(key, callback);
};

cache.setKey = function(key, val, callback){
    client.set(key, val, function(err){
        callback(err, val);
    });
}


/**
 * Create an createCache.
 *
 * @return {Function}
 * @api public
 */

function createCache() {
  cache.init();
  return app;
}



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
}

exports.getCache = getCache;
exports = module.exports = createApplication;
