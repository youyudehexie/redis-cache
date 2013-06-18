var getCache = require('../lib').getCache;

getCache('aa', function(cb){
    cb(null, '123')

},function(err, data){
    console.log(data);
});
