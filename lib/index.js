/**
 * Cache prototype.
 */

var cache = exports = module.exports = {};

cache.getKey = function(key, callback){
  client.get(key, callback);
};

cache.setKey = function(key, val, callback){
    client.set(key, val, function(err){
        callback(err, val);
    });
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