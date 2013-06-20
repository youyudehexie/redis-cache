var getCache = require('../lib').getCache;
var cache = require('../lib');
var recoverCache = require('../lib').recoverCache;

cache.init();

getCache('aa', function(cb){
    cb(null, '123')

},function(err, data){
    console.log(data);
});

recoverCache('test*', 'get', function(datas, cb){
    datas.forEach(function(data){
	console.log('data: ' + data);
    });
    cb(null, 'abc');
},function(err){
    console.log(err);
})
