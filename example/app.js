var getCache = require('../lib').getCache;
var cache = require('../lib');

cache.init();

getCache('aa', function(cb){
    cb(null, '123')

},function(err, data){
    console.log(data);
});
